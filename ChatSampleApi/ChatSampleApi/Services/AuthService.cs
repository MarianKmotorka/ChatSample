using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Features.Auth.GoogleLogin;
using ChatSampleApi.Options;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ChatSampleApi.Services
{
    public class AuthService
    {
        private readonly JwtOptions _jwtOptions;
        private readonly DatabaseContext _db;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public const string IsAccessTokenClaim = "IsAccessToken";
        public const string IsRefreshTokenClaim = "IsRefreshToken";

        public AuthService(JwtOptions jwtOptions, DatabaseContext db, TokenValidationParameters tokenValidationParameters)
        {
            _jwtOptions = jwtOptions;
            _db = db;
            _tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<(string jwt, string refreshToken)> LoginWithGoogle(GoogleUserInfoModel model)
        {
            var user = await _db.Users.SingleOrDefaultAsync(x => x.Email.ToLower() == model.Email.ToLower())
               ?? CreateUser(model);

            return await CreateJwtAndRefreshToken(user);
        }

        public async Task<(string jwt, string refreshToken)> RefreshJwtAsync(string refreshToken)
        {
            var validatedRefreshToken = GetPrincipalFromJwt(refreshToken);

            if (validatedRefreshToken is null)
                throw new BadRequestException("Invalid Refresh Token");

            if (validatedRefreshToken.Claims.SingleOrDefault(x => x.Type == IsRefreshTokenClaim) is null)
                throw new BadRequestException("Invalid Refresh Token");

            var expiryDateUnix =
                    long.Parse(validatedRefreshToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expiryDateUtc =
                new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expiryDateUnix);

            if (expiryDateUtc < DateTime.UtcNow)
                throw new BadRequestException("Refresh Token Is Expired.");

            var appUserId = validatedRefreshToken.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var appUser = await _db.Users.SingleAsync(x => x.Id == appUserId);
            var storedRefreshToken = appUser.RefreshToken;

            if (storedRefreshToken != refreshToken)
                throw new BadRequestException("Invalid Refresh Token.");

            return await CreateJwtAndRefreshToken(appUser);
        }

        private async Task<(string jwt, string refreshToken)> CreateJwtAndRefreshToken(AuthUser authUser)
        {
            var accessToken = CreateAccessToken(authUser);
            var refreshToken = CreateRefreshToken(authUser);

            authUser.RefreshToken = refreshToken;
            await _db.SaveChangesAsync();

            return (accessToken, refreshToken);
        }

        private string CreateRefreshToken(AuthUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.Secret);
            var jti = Guid.NewGuid().ToString();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti,  jti),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
                new Claim(IsRefreshTokenClaim, "true")
            };

            var refreshTokenObject = new JwtSecurityToken(
                _jwtOptions.Issuer,
                null,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.Add(_jwtOptions.RefreshTokenLifeTime),
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );

            return tokenHandler.WriteToken(refreshTokenObject);
        }

        private string CreateAccessToken(AuthUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.Secret);
            var jti = Guid.NewGuid().ToString();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti,  jti),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
                new Claim(IsAccessTokenClaim,"true")
            };

            var refreshTokenObject = new JwtSecurityToken(
                _jwtOptions.Issuer,
                null,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.Add(_jwtOptions.TokenLifeTime),
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );

            return tokenHandler.WriteToken(refreshTokenObject);
        }

        private ClaimsPrincipal GetPrincipalFromJwt(string jwt)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = _tokenValidationParameters.Clone();
            tokenValidationParameters.ValidateLifetime = false;

            try
            {
                var principal = jwtHandler.ValidateToken(jwt, tokenValidationParameters, out var validatedJwt);

                var hasJwtValidSecurityAlgorithm =
                    (validatedJwt is JwtSecurityToken jwtSecurityToken) && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                if (!hasJwtValidSecurityAlgorithm) return null;

                return principal;
            }
            catch
            {
                return null;
            }
        }

        private AuthUser CreateUser(GoogleUserInfoModel model)
        {
            var newUser = new AuthUser(model.Email)
            {
                Id = Guid.NewGuid().ToString(),
                EmailConfirmed = model.IsEmailVerified,
                FullName = model.Name,
                Picture = model.PictureUrl
            };

            _db.Users.Add(newUser);
            return newUser;
        }
    }

    public static class AuthCookies
    {
        public static string RefreshToken { get; } = "refresh-token";
        public static string AccessToken { get; } = "access-token";
    }
}

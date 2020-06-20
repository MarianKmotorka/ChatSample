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

        public async Task<(string jwt, string refreshToken)> RefreshJwtAsync(string expiredJwt, string refreshToken)
        {
            var validatedJwt = GetPrincipalFromJwt(expiredJwt);

            if (validatedJwt == null)
                throw new BadRequestException("Invalid JWT");

            var expiryDateUnix =
                long.Parse(validatedJwt.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expiryDateUtc =
                new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expiryDateUnix);

            if (expiryDateUtc > DateTime.UtcNow)
                throw new BadRequestException("JWT is not expired yet.");

            var jwtId = validatedJwt.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await _db.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);

            if (storedRefreshToken == null)
                throw new BadRequestException("Refresh token does not exist.");

            if (storedRefreshToken.ExpiryDate < DateTime.UtcNow)
                throw new BadRequestException("Refresh token expired.");

            if (storedRefreshToken.Used)
                throw new BadRequestException("Refresh token has been used.");

            if (storedRefreshToken.JwtId != jwtId)
                throw new BadRequestException("Refresh token does not match JWT.");

            storedRefreshToken.Used = true;
            await _db.SaveChangesAsync();

            var appUserId = validatedJwt.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var appUser = await _db.Users.SingleAsync(x => x.Id == appUserId);

            return await CreateJwtAndRefreshToken(appUser);
        }

        private async Task<(string jwt, string refreshToken)> CreateJwtAndRefreshToken(AuthUser authUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.Secret);
            var jti = Guid.NewGuid().ToString();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, authUser.Id),
                new Claim(JwtRegisteredClaimNames.Jti, jti),
                new Claim(JwtRegisteredClaimNames.Email, authUser.Email),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer)
            };

            var jwtObject = new JwtSecurityToken(
                _jwtOptions.Issuer,
                null,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.Add(_jwtOptions.TokenLifeTime),
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );

            var refreshToken = new RefreshToken
            {
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.Add(_jwtOptions.RefreshTokenLifeTime),
                JwtId = jti
            };

            _db.RefreshTokens.Add(refreshToken);
            await _db.SaveChangesAsync();

            return (tokenHandler.WriteToken(jwtObject), refreshToken.Token);
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
            var newUser = new AuthUser
            {
                Id = Guid.NewGuid().ToString(),
                Email = model.Email,
                UserName = model.Email,
                EmailConfirmed = model.IsEmailVerified,
                FullName = model.Name,
                Picture = model.PictureUrl
            };

            _db.Users.Add(newUser);
            return newUser;
        }
    }
}

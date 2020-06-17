using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChatSampleApi.Features.Auth.GoogleLogin;
using ChatSampleApi.Options;
using ChatSampleApi.Persistance;
using ChatSampleApi.Persistance.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ChatSampleApi.Services
{
    public class AuthService
    {
        private readonly JwtOptions _jwtOptions;
        private readonly DatabaseContext _db;

        public AuthService(JwtOptions jwtOptions, DatabaseContext db)
        {
            _jwtOptions = jwtOptions;
            _db = db;
        }

        public async Task<string> CreateJwt(GoogleUserInfoModel model)
        {
            var userDbId = await RegisterIfNotAlready(model);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.Secret);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userDbId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, model.Email),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer)
            };

            var jwtObject = new JwtSecurityToken(
                _jwtOptions.Issuer,
                null,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.Add(_jwtOptions.TokenLifeTime),
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                );

            return tokenHandler.WriteToken(jwtObject);
        }

        private async Task<string> RegisterIfNotAlready(GoogleUserInfoModel model)
        {
            var user = await _db.Users.SingleOrDefaultAsync(x => x.Email.ToLower() == model.Email.ToLower());

            if (user is object)
                return user.Id;

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
            await _db.SaveChangesAsync();

            return newUser.Id;
        }
    }
}

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace ChatSampleApi.Features.Auth
{
    public class Logout
    {
        public class Command : IRequest
        {
            public string RefreshToken { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly DatabaseContext _db;
            private readonly TokenValidationParameters _tokenValidationParameters;
            private readonly HttpContext _httpContext;

            public CommandHandler(DatabaseContext db, TokenValidationParameters tokenValidationParameters, IHttpContextAccessor httpContextAccessor)
            {
                _db = db;
                _tokenValidationParameters = tokenValidationParameters;
                _httpContext = httpContextAccessor.HttpContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = GetUserIdFromToken(request.RefreshToken);

                if (userId is null)
                    throw new BadRequestException("Invalid refresh token.");

                var user = await _db.Users.SingleOrNotFoundAsync(x => x.Id == userId, cancellationToken);

                if (request.RefreshToken != user.RefreshToken)
                    throw new BadRequestException("Invalid refresh token.");

                user.RefreshToken = null;

                _httpContext.Response.Cookies.Append(AuthCookies.RefreshToken, string.Empty, new CookieOptions
                {
                    MaxAge = TimeSpan.FromSeconds(0),
                    SameSite = SameSiteMode.Strict,
                    HttpOnly = true,
                    Path = "/",
                });

                await _db.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }

            private string GetUserIdFromToken(string refreshToken)
            {
                try
                {
                    var jwtHandler = new JwtSecurityTokenHandler();
                    var principal = jwtHandler.ValidateToken(refreshToken, _tokenValidationParameters, out var validatedJwt);

                    var hasJwtValidSecurityAlgorithm =
                        (validatedJwt is JwtSecurityToken jwtSecurityToken) && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (!hasJwtValidSecurityAlgorithm) return null;

                    return principal.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Options;
using ChatSampleApi.Services;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace ChatSampleApi.Features.Auth.RefreshToken
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
    {
        private readonly AuthService _authService;
        private readonly JwtOptions _jwtOptions;
        private readonly HttpContext _httpContext;

        public RefreshTokenCommandHandler(AuthService authService, IHttpContextAccessor httpContextAccessor, JwtOptions jwtOptions)
        {
            _authService = authService;
            _jwtOptions = jwtOptions;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public async Task<RefreshTokenResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var (accessToken, refreshToken) = await _authService.RefreshJwtAsync(request.RefreshToken);

            _httpContext.Response.Cookies.Append(AuthCookies.RefreshToken, refreshToken, new CookieOptions
            {
                MaxAge = _jwtOptions.RefreshTokenLifeTime,
                SameSite = SameSiteMode.Strict,
                HttpOnly = true,
                Path = "/",
            });

            return new RefreshTokenResponse
            {
                AccessToken = accessToken,
            };
        }
    }
}

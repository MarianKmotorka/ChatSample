using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Services;
using MediatR;

namespace ChatSampleApi.Features.Auth.RefreshToken
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
    {
        private readonly AuthService _authService;

        public RefreshTokenCommandHandler(AuthService authService)
        {
            _authService = authService;
        }

        public async Task<RefreshTokenResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var (jwt, refreshToken) = await _authService.RefreshJwtAsync(request.Jwt, request.RefreshToken);

            return new RefreshTokenResponse
            {
                Jwt = jwt,
                RefreshToken = refreshToken
            };
        }
    }
}

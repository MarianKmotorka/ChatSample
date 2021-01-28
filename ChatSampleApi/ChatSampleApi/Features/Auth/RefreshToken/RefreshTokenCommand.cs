using MediatR;

namespace ChatSampleApi.Features.Auth.RefreshToken
{
    public class RefreshTokenCommand : IRequest<RefreshTokenResponse>
    {
        public string RefreshToken { get; set; }
    }
}

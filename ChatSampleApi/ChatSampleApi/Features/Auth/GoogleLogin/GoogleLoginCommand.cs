using MediatR;

namespace ChatSampleApi.Features.Auth.GoogleLogin
{
    public class GoogleLoginCommand : IRequest<GoogleLoginResponse>
    {
        public string Code { get; set; }
    }
}

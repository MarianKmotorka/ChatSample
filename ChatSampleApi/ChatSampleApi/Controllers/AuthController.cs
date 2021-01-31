using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Features.Auth;
using ChatSampleApi.Features.Auth.GoogleLogin;
using ChatSampleApi.Features.Auth.RefreshToken;
using ChatSampleApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        [HttpGet("google-code-callback")]
        public async Task<ActionResult<GoogleLoginResponse>> GoogleCodeCallback(string code, CancellationToken ct)
        {
            var response = await Mediator.Send(new GoogleLoginCommand { Code = code }, ct);
            return Ok(response);
        }

        [HttpGet("refresh-token")]
        public async Task<ActionResult<RefreshTokenResponse>> RefreshToken(CancellationToken ct)
        {
            Request.Cookies.TryGetValue(AuthCookies.RefreshToken, out string refreshToken);
            var resposne = await Mediator.Send(new RefreshTokenCommand { RefreshToken = refreshToken }, ct);
            return Ok(resposne);
        }

        [HttpPost("logout")]
        public async Task<ActionResult<RefreshTokenResponse>> Logout(CancellationToken ct)
        {
            Request.Cookies.TryGetValue(AuthCookies.RefreshToken, out string refreshToken);
            var resposne = await Mediator.Send(new Logout.Command { RefreshToken = refreshToken }, ct);
            return Ok(resposne);
        }

        [Authorize]
        [HttpGet("cloudinary-signature")]
        public async Task<ActionResult<GetCloudinarySignature.Response>> GetCloudinarySignature([FromQuery] GetCloudinarySignature.Query request)
        {
            var response = await Mediator.Send(request);
            return Ok(response);
        }
    }
}

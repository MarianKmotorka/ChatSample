using System.Threading.Tasks;
using ChatSampleApi.Features.Auth;
using ChatSampleApi.Features.Auth.GoogleLogin;
using ChatSampleApi.Features.Auth.RefreshToken;
using ChatSampleApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        [HttpGet("google-code-callback")]
        public async Task<ActionResult<GoogleLoginResponse>> GoogleCodeCallback(string code)
        {
            var response = await Mediator.Send(new GoogleLoginCommand { Code = code });
            return Ok(response);
        }

        [HttpGet("refresh-token")]
        public async Task<ActionResult<RefreshTokenResponse>> RefreshToken()
        {
            Request.Cookies.TryGetValue(AuthCookies.RefreshToken, out string refreshToken);
            var resposne = await Mediator.Send(new RefreshTokenCommand { RefreshToken = refreshToken });
            return Ok(resposne);
        }

        [HttpPost("logout")]
        public async Task<ActionResult<RefreshTokenResponse>> Logout()
        {
            Request.Cookies.TryGetValue(AuthCookies.RefreshToken, out string refreshToken);
            var resposne = await Mediator.Send(new Logout.Command { RefreshToken = refreshToken });
            return Ok(resposne);
        }
    }
}

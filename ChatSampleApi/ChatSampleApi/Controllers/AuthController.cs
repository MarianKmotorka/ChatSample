using System.Threading.Tasks;
using ChatSampleApi.Features.Auth.GoogleLogin;
using ChatSampleApi.Features.Auth.RefreshToken;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        [HttpGet("google-code-callback")]
        public async Task<ActionResult> GoogleCodeCallback(string code)
        {
            var response = await Mediator.Send(new GoogleLoginCommand { Code = code });
            return Ok(response);
        }

        [HttpPost("/refresh-token")]
        public async Task<ActionResult> RefreshToken(RefreshTokenCommand request)
        {
            var resposne = await Mediator.Send(request);
            return Ok(resposne);
        }
    }
}

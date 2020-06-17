using System.Threading.Tasks;
using ChatSampleApi.Features.Auth.GoogleLogin;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Route("auth")]
    public class AuthController : BaseController
    {
        //TODO add exception middleware + add migration

        [HttpGet("google-code-callback")]
        public async Task<ActionResult> GoogleCodeCallback(string code)
        {
            var response = await Mediator.Send(new GoogleLoginCommand { Code = code });
            return Ok(response);
        }
    }
}

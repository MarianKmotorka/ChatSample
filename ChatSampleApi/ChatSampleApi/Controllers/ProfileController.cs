using System.Threading.Tasks;
using ChatSampleApi.Features.Profile.GetMyProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Authorize]
    [Route("api/profile")]
    public class ProfileController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var response = await Mediator.Send(new GetMyProfileQuery { UserId = CurrentUserService.UserId });
            return Ok(response);
        }
    }
}

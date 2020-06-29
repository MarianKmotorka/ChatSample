﻿using System.Threading.Tasks;
using ChatSampleApi.Features.Profile.GetMyProfile;
using ChatSampleApi.Features.Users.GetUsers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Authorize]
    [Route("api/users")]
    public class UsersController : BaseController
    {
        [HttpGet("me")]
        public async Task<ActionResult> Get()
        {
            var response = await Mediator.Send(new GetMyProfileQuery { UserId = CurrentUserService.UserId });
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(string text)
        {
            var result = await Mediator.Send(new GetUsersQuery { Text = text });
            return Ok(result);
        }
    }
}
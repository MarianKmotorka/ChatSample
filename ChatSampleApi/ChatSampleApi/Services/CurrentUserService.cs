﻿using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace ChatSampleApi.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            var userClaims = httpContextAccessor.HttpContext.User.Claims;

            UserId = userClaims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
        }

        public string UserId { get; }
    }
}
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace ChatSampleApi.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            HttpContext = httpContextAccessor.HttpContext;
            var userClaims = httpContextAccessor.HttpContext.User.Claims;

            UserId = userClaims.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public string UserId { get; }

        public HttpContext HttpContext { get; }
    }
}

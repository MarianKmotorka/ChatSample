using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using ChatSampleApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Middleware.Authorization
{
    public class ChatParticipantHandler : AuthorizationHandler<ChatParticipantRequirement>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly DatabaseContext _db;

        public ChatParticipantHandler(ICurrentUserService currentUserService, DatabaseContext db)
        {
            _currentUserService = currentUserService;
            _db = db;
        }

        protected async override Task HandleRequirementAsync(AuthorizationHandlerContext context, ChatParticipantRequirement requirement)
        {
            var routeValues = _currentUserService.HttpContext.Request.RouteValues;

            if (!routeValues.TryGetValue("id", out var chatId) && !routeValues.TryGetValue("chatId", out chatId))
            {
                context.Succeed(requirement);
                return;
            }

            var isParticipant = await _db.Chats.Where(x => x.Id == chatId.ToString())
                    .SelectMany(x => x.Participants)
                    .AnyAsync(x => x.UserId == _currentUserService.UserId);

            if (isParticipant)
                context.Succeed(requirement);
        }
    }
}

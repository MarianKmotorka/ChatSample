using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using ChatSampleApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    [Authorize]
    public class ChatHub : Hub
    {
        public const string ApiPath = "/api/chat-hub";
        public const string GetMessages = "GetMessages";
        public const string GetParticipants = "GetParticipants";
        public const string GetChats = "GetChats";
        public const string GetConnectionId = "GetConnectionId";

        private readonly ICurrentUserService _currentUserService;
        private readonly DatabaseContext _db;

        public ChatHub(ICurrentUserService currentUserService, DatabaseContext db)
        {
            _currentUserService = currentUserService;
            _db = db;
        }

        public async override Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync(GetConnectionId, Context.ConnectionId);
            await AddUserToGroups();

            await base.OnConnectedAsync();
        }

        private async Task AddUserToGroups()
        {
            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == _currentUserService.UserId)).ToListAsync();

            foreach (var group in groups)
                await Groups.AddToGroupAsync(Context.ConnectionId, group.Id);
        }
    }
}

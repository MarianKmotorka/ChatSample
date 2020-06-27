using System.Collections.Generic;
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
        public const string RecieveMessage = "RecieveMessage";
        public const string RecieveParticipant = "RecieveParticipant";
        public const string RecieveChat = "RecieveChat";
        public const string DeleteChat = "DeleteChat";
        public const string GetConnectionId = "GetConnectionId";

        private readonly ICurrentUserService _currentUserService;
        private readonly DatabaseContext _db;

        private static Dictionary<string, string[]> _userConnections = new Dictionary<string, string[]>();
        public static IReadOnlyDictionary<string, string[]> UserConnections
        {
            get => _userConnections;
        }

        public ChatHub(ICurrentUserService currentUserService, DatabaseContext db)
        {
            _currentUserService = currentUserService;
            _db = db;
        }

        public async override Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync(GetConnectionId, Context.ConnectionId);
            await AddUserToGroups();
            AddUserConnection();

            await base.OnConnectedAsync();
        }

        private void AddUserConnection()
        {
            var userId = _currentUserService.UserId;

            if (_userConnections.ContainsKey(userId))
                _userConnections[userId].Append(Context.ConnectionId);
            else
                _userConnections.Add(userId, new[] { Context.ConnectionId });
        }

        private async Task AddUserToGroups()
        {
            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == _currentUserService.UserId)).ToListAsync();

            foreach (var group in groups)
                await Groups.AddToGroupAsync(Context.ConnectionId, group.Id);
        }
    }
}

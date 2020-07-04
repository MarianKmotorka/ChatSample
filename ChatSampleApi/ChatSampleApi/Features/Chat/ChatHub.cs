using System;
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
        public const string DeleteParticipant = "DeleteParticipant";
        public const string GetConnectionId = "GetConnectionId";
        public const string UserConnectedStatusChanged = "UserConnectedStatusChanged";

        private readonly ICurrentUserService _currentUserService;
        private readonly DatabaseContext _db;

        private static Dictionary<string, List<string>> _userConnections = new Dictionary<string, List<string>>();
        public static IReadOnlyDictionary<string, List<string>> UserConnections
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
            AddUserConnection();
            await Clients.Caller.SendAsync(GetConnectionId, Context.ConnectionId);
            await AddUserToGroups();

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await RemoveUserFromGroups();
            RemoveUserConnections();
            await base.OnDisconnectedAsync(exception);
        }

        private void AddUserConnection()
        {
            var userId = _currentUserService.UserId;

            if (_userConnections.ContainsKey(userId))
                _userConnections[userId].Add(Context.ConnectionId);
            else
                _userConnections.Add(userId, new List<string> { Context.ConnectionId });
        }

        private async Task AddUserToGroups()
        {
            var userId = _currentUserService.UserId;
            await SetUserOnlineStatus(userId);
            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == _currentUserService.UserId)).ToListAsync();

            foreach (var group in groups)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, group.Id);
                await Clients.Group(group.Id).SendAsync(UserConnectedStatusChanged, userId, true);
            }
        }

        private async Task RemoveUserFromGroups()
        {
            var userId = _currentUserService.UserId;
            await SetUserOnlineStatus(userId, isOnline: false);
            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == _currentUserService.UserId)).ToListAsync();

            foreach (var group in groups)
            {
                await Clients.Group(group.Id).SendAsync(UserConnectedStatusChanged, userId, false);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Id);
            }
        }

        private void RemoveUserConnections()
        {
            var userId = _currentUserService.UserId;

            if (_userConnections.ContainsKey(userId))
                _userConnections[userId].Remove(Context.ConnectionId);
        }

        private async Task SetUserOnlineStatus(string userId, bool isOnline = true)
        {
            var user = await _db.Users.FindAsync(userId) ?? throw new ArgumentException($"User with id ({userId}) not found.");
            user.IsOnline = isOnline;
            await _db.SaveChangesAsync();
        }
    }
}

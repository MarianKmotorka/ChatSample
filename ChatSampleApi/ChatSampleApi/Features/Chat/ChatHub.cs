using System;
using System.Collections.Concurrent;
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
        public const string RecieveMessage = nameof(RecieveMessage);
        public const string RecieveParticipant = nameof(RecieveParticipant);
        public const string RecieveChat = nameof(RecieveChat);
        public const string DeleteChat = nameof(DeleteChat);
        public const string DeleteMessage = nameof(DeleteMessage);
        public const string DeleteParticipant = nameof(DeleteParticipant);
        public const string GetConnectionId = nameof(GetConnectionId);
        public const string ChangeUserStatus = nameof(ChangeUserStatus);
        public const string ChangeParticipantRole = nameof(ChangeParticipantRole);
        public const string RecoverMessage = nameof(RecoverMessage);
        public const string RenameChat = nameof(RenameChat);
        public const string SetIsTyping = nameof(SetIsTyping);

        private readonly ICurrentUserService _currentUserService;
        private readonly DatabaseContext _db;

        private static ConcurrentDictionary<string, List<string>> _userConnections = new ConcurrentDictionary<string, List<string>>();
        public static IReadOnlyDictionary<string, List<string>> UserConnections => _userConnections;

        public ChatHub(ICurrentUserService currentUserService, DatabaseContext db)
        {
            _currentUserService = currentUserService;
            _db = db;
        }

        [HubMethodName("SendIsTyping")]
        public async Task SendIsTyping(bool isTyping, string chatId)
        {
            var userId = _currentUserService.UserId;
            await Clients.GroupExcept(chatId, _userConnections[userId]).SendAsync(SetIsTyping, isTyping, userId, chatId);
        }

        #region OnConnected / OnDisconnected

        public async override Task OnConnectedAsync()
        {
            AddUserConnection();
            await Clients.Caller.SendAsync(GetConnectionId, Context.ConnectionId);
            await AddUserToGroups();

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            RemoveUserConnection();
            await RemoveUserFromGroups();
            await base.OnDisconnectedAsync(exception);
        }

        private void AddUserConnection()
        {
            _userConnections.AddOrUpdate(
                _currentUserService.UserId,
                _ => new List<string> { Context.ConnectionId },
                (_, prevCollection) => prevCollection.Append(Context.ConnectionId).ToList());
        }

        private async Task AddUserToGroups()
        {
            var userId = _currentUserService.UserId;
            await SetUserOnlineStatus(userId);
            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == _currentUserService.UserId)).ToListAsync();

            foreach (var group in groups)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, group.Id);
                await Clients.Group(group.Id).SendAsync(ChangeUserStatus, userId, true);
            }
        }

        private async Task RemoveUserFromGroups()
        {
            var userId = _currentUserService.UserId;
            var userIsOffline = !_userConnections.ContainsKey(userId);

            if (userIsOffline)
                await SetUserOnlineStatus(userId, isOnline: false);

            var groups = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == userId)).ToListAsync();

            foreach (var group in groups)
            {
                if (userIsOffline)
                    await Clients.Group(group.Id).SendAsync(ChangeUserStatus, userId, false);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Id);
            }
        }

        private void RemoveUserConnection()
        {
            var userId = _currentUserService.UserId;

            if (!_userConnections.ContainsKey(userId))
                return;

            _userConnections[userId].Remove(Context.ConnectionId);

            if (_userConnections[userId].Count == 0)
                _userConnections.TryRemove(userId, out _);
        }

        private async Task SetUserOnlineStatus(string userId, bool isOnline = true)
        {
            var user = await _db.Users.FindAsync(userId) ?? throw new ArgumentException($"User with id ({userId}) not found.");
            user.IsOnline = isOnline;
            await _db.SaveChangesAsync();
        }

        #endregion
    }
}

using System.Collections.Generic;
using ChatSampleApi.Persistence.Entities.JunctionEntities;
using Microsoft.AspNetCore.Identity;

namespace ChatSampleApi.Persistence.Entities
{
    public class AuthUser : IdentityUser<string>
    {
        public string FullName { get; set; }

        public string Picture { get; set; }

        public IReadOnlyCollection<UserUnreadMessage> UnreadMessages => _unreadMessages;
        private List<UserUnreadMessage> _unreadMessages;

        public bool IsOnline { get; set; }

        public void AddUnreadMessage(Message message) => _unreadMessages.Add(new UserUnreadMessage(this, message));

        public void SetUnreadMessagesAsRead(string chatId) => _unreadMessages.RemoveAll(x => x.Message.ChatId == chatId);
    }
}

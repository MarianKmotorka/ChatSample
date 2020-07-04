using System;

namespace ChatSampleApi.Persistence.Entities.JunctionEntities
{
    public class ChatUser
    {
        public ChatUser(AuthUser user, Chat chat)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
            Chat = chat ?? throw new ArgumentNullException(nameof(chat));
        }

        private ChatUser()
        {
        }

        public AuthUser User { get; private set; }

        public string UserId { get; private set; }

        public Chat Chat { get; private set; }

        public string ChatId { get; private set; }
    }
}

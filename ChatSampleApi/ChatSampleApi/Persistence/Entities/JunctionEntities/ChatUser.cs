using System;

namespace ChatSampleApi.Persistence.Entities.JunctionEntities
{
    public class ChatUser
    {
        public ChatUser(AuthUser user, Chat chat, ChatRole role)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
            Chat = chat ?? throw new ArgumentNullException(nameof(chat));
            Role = role;
        }

        public ChatUser(AuthUser user, Chat chat) : this(user, chat, ChatRole.Participant)
        {
        }

        private ChatUser()
        {
        }

        public AuthUser User { get; private set; }

        public string UserId { get; private set; }

        public Chat Chat { get; private set; }

        public string ChatId { get; private set; }

        public ChatRole Role { get; private set; }

        public void MakeUserAdmin() => Role = ChatRole.Admin;
    }
}

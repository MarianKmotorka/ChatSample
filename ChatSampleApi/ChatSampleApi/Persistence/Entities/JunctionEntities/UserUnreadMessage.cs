using System;

namespace ChatSampleApi.Persistence.Entities.JunctionEntities
{
    public class UserUnreadMessage
    {
        public UserUnreadMessage(AuthUser user, Message message)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
            Message = message ?? throw new ArgumentNullException(nameof(message));
        }

        private UserUnreadMessage()
        {
        }

        public AuthUser User { get; private set; }

        public string UserId { get; private set; }

        public Message Message { get; private set; }

        public string MessageId { get; private set; }
    }
}

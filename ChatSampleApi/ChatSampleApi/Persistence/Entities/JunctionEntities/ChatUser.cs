using System.Collections.Generic;

namespace ChatSampleApi.Persistence.Entities.JunctionEntities
{
    public class ChatUser
    {
        public AuthUser User { get; set; }

        public string UserId { get; set; }

        public Chat Chat { get; set; }

        public string ChatId { get; set; }

        public List<Message> UnreadMessages { get; set; }
    }
}

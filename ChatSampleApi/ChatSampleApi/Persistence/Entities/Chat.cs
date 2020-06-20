using System.Collections.Generic;
using ChatSampleApi.Persistence.Entities.JunctionEntities;

namespace ChatSampleApi.Persistence.Entities
{
    public class Chat
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<ChatUser> Participants { get; set; }

        public IEnumerable<Message> Messages { get; set; }
    }
}

using System;

namespace ChatSampleApi.Persistence.Entities
{
    public class Message
    {
        public string Id { get; private set; }

        public string Text { get; set; }

        public AuthUser Sender { get; set; }

        public Chat Chat { get; set; }

        public string ChatId { get; private set; }

        public DateTime SentDate { get; set; }
    }
}

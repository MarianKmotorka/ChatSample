using System;

namespace ChatSampleApi.Persistence.Entities
{
    public class Message
    {
        public string Id { get; set; }

        public string Text { get; set; }

        public AuthUser Sender { get; set; }

        public DateTime SentDate { get; set; }
    }
}

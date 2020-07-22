using System;

namespace ChatSampleApi.Persistence.Entities
{
    public class Message
    {
        public Message(string text, AuthUser sender, Chat chat)
        {
            SenderId = sender.Id;
            Sender = sender;

            ChatId = chat.Id;
            Chat = chat;

            Text = text;
            SentDate = DateTime.Now;
        }

        private Message()
        {
        }

        public string Id { get; private set; }

        public string Text { get; private set; }

        public AuthUser Sender { get; private set; }

        public string SenderId { get; private set; }

        public Chat Chat { get; private set; }

        public string ChatId { get; private set; }

        public DateTime SentDate { get; private set; }
    }
}

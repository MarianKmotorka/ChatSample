using System;

namespace ChatSampleApi.Features.Chat.GetMessages
{
    public class MessageDto
    {
        public string Id { get; set; }

        public string SenderName { get; set; }

        public string SenderPicture { get; set; }

        public bool IsMyMessage { get; set; }

        public string Text { get; set; }

        public DateTime Date { get; set; }
    }
}

using System;
using System.Collections.Generic;
using ChatSampleApi.Persistence.Entities;

namespace ChatSampleApi.Features.Chat.GetMyChat
{
    public class GetMyChatResponse
    {
        public string Id { get; set; }

        public IEnumerable<MessageDto> Messages { get; set; }

        public IEnumerable<ParticipantDto> Participants { get; set; }

        public class ParticipantDto
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public string Picture { get; set; }

            public bool IsOnline { get; set; }

            public ChatRole ChatRole { get; set; }
        }

        public class MessageDto
        {
            public string Id { get; set; }

            public string SenderId { get; set; }

            public string SenderName { get; set; }

            public string SenderPicture { get; set; }

            public bool IsMyMessage { get; set; }

            public string Text { get; set; }

            public DateTime Date { get; set; }
        }
    }
}
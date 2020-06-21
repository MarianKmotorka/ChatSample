using System.Collections.Generic;
using MediatR;

namespace ChatSampleApi.Features.Chat.GetMessages
{
    public class GetMessagesQuery : IRequest<IEnumerable<MessageDto>>
    {
        public string UserId { get; set; }

        public string ChatId { get; set; }

        public int Count { get; set; } = 50;

        public int Offset { get; set; } = 0;
    }
}

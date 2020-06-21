using System.Text.Json.Serialization;
using MediatR;

namespace ChatSampleApi.Features.Chat.SendMessage
{
    public class SendMessageCommand : IRequest
    {
        [JsonIgnore]
        public string ChatId { get; set; }

        [JsonIgnore]
        public string UserId { get; set; }

        public string Text { get; set; }
    }
}

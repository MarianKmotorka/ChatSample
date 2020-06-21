using System.Text.Json.Serialization;
using MediatR;

namespace ChatSampleApi.Features.Chat.CreateChat
{
    public class CreateChatCommand : IRequest<string>
    {
        [JsonIgnore]
        public string UserId { get; set; }

        public string Name { get; set; }

        public string ConnectionId { get; set; }
    }
}

using System.Text.Json.Serialization;
using MediatR;

namespace ChatSampleApi.Features.Chat.CreateChat
{
    public class CreateChatCommand : IRequest
    {
        [JsonIgnore]
        public string UserId { get; set; }

        public string Name { get; set; }
    }
}

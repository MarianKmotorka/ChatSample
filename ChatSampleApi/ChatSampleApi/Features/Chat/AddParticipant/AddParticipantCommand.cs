using MediatR;
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat.AddParticipant
{
    public class AddParticipantCommand : IRequest
    {
        [JsonIgnore]
        public string ChatId { get; set; }

        public string ParticipantId { get; set; }
    }
}

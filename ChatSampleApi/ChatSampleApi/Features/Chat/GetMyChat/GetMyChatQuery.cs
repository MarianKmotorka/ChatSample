using MediatR;

namespace ChatSampleApi.Features.Chat.GetMyChat
{
    public class GetMyChatQuery : IRequest<GetMyChatResponse>
    {
        public string ChatId { get; set; }

        public string UserId { get; set; }
    }
}

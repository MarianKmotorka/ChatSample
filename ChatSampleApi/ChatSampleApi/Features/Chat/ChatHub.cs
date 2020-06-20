using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatSampleApi.Features.Chat
{
    [Authorize]
    public class ChatHub : Hub
    {
        public string GetConnectionId() => Context.ConnectionId;

        public ChatHub()
        {

        }
    }
}

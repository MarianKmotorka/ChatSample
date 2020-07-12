using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace ChatSampleApi.Features.Chat.CreateChat
{
    public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand, string>
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public CreateChatCommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<string> Handle(CreateChatCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Name))
                throw new BadRequestException("Name cannot be empty");

            var user = await _db.Users.FindAsync(request.UserId);

            var newChat = new Persistence.Entities.Chat(request.Name);
            newChat.AddAdmin(user);

            _db.Chats.Add(newChat);
            await _db.SaveChangesAsync();

            await NotifyHub(request.UserId, newChat);

            return newChat.Id;
        }

        private async Task NotifyHub(string userId, Persistence.Entities.Chat newChat)
        {
            if (!ChatHub.UserConnections.TryGetValue(userId, out var connectionIds))
                return;

            foreach (var connectionId in connectionIds)
            {
                await _hubContext.Groups.AddToGroupAsync(connectionId, newChat.Id);
                await _hubContext.Clients.Client(connectionId).SendAsync(ChatHub.RecieveChat, new GetMyChatsList.ChatDto
                {
                    Id = newChat.Id,
                    Name = newChat.Name,
                    ChatRole = ChatRole.Admin
                });
            }
        }
    }
}

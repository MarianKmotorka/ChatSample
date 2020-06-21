﻿using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities.JunctionEntities;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace ChatSampleApi.Features.Chat.CreateChat
{
    public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand>
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public CreateChatCommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(CreateChatCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Name))
                throw new BadRequestException("Name cannot be empty");

            var user = await _db.Users.FindAsync(request.UserId);

            var newChat = new Persistence.Entities.Chat
            {
                Name = request.Name,
                Participants = new[] { new ChatUser { User = user } }
            };

            _db.Chats.Add(newChat);
            await _db.SaveChangesAsync();

            await _hubContext.Groups.AddToGroupAsync(request.ConnectionId, newChat.Id);
            await _hubContext.Clients.Group(newChat.Id).SendAsync("GetChats");

            return Unit.Value;
        }
    }
}

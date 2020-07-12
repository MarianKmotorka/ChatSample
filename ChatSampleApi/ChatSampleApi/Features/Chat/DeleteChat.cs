using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using ChatSampleApi.Persistence.Entities.JunctionEntities;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class DeleteChat
    {
        public class Command : IRequest
        {
            public string ChatId { get; set; }

            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DatabaseContext _db;
            private readonly IHubContext<ChatHub> _hubContext;

            public Handler(DatabaseContext db, IHubContext<ChatHub> hubContext)
            {
                _db = db;
                _hubContext = hubContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var chat =
                    await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId);

                CheckAuthorization(chat.Participants, request.UserId);

                await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.DeleteChat, request.ChatId);

                _db.Chats.Remove(chat);
                await _db.SaveChangesAsync();

                return Unit.Value;
            }

            private void CheckAuthorization(IReadOnlyCollection<ChatUser> participants, string userId)
            {
                var user = participants.SingleOrDefault(x => x.UserId == userId);

                if (user is null || user.Role != ChatRole.Admin)
                    throw new Forbidden403Exception("Only chat participants in ADMIN role can delete chat.");
            }
        }
    }
}

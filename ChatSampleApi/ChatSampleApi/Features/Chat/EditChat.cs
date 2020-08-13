using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat
{
    public class EditChat
    {
        public class Command : IRequest
        {
            [JsonIgnore]
            public string ChatId { get; set; }

            [JsonIgnore]
            public string UserId { get; set; }

            public string Name { get; set; }
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
                var chat = await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId, cancellationToken);

                if (!chat.Participants.Any(x => x.UserId == request.UserId))
                    throw new Forbidden403Exception("You are not chat participant.");

                chat.SetName(request.Name);
                await _db.SaveChangesAsync(cancellationToken);

                await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.RenameChat, chat.Id, chat.Name);

                return Unit.Value;
            }
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
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
                var chat = await _db.Chats.SingleOrNotFoundAsync(x => x.Id == request.ChatId, cancellationToken);

                chat.SetName(request.Name);
                await _db.SaveChangesAsync(cancellationToken);

                await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.RenameChat, chat.Id, chat.Name);

                return Unit.Value;
            }
        }
    }
}

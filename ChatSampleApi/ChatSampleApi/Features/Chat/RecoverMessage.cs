using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat
{
    public class RecoverMessage
    {
        public class Command : IRequest
        {
            [JsonIgnore]
            public string AuthUserId { get; set; }

            public string MessageId { get; set; }

            public string ChatId { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly DatabaseContext _db;
            private readonly IHubContext<ChatHub> _hubContext;

            public CommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
            {
                _db = db;
                _hubContext = hubContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var message = await _db.Chats
                    .Where(x => x.Id == request.ChatId)
                    .SelectMany(x => x.Messages)
                    .SingleOrNotFoundAsync(x => x.Id == request.MessageId, cancellationToken);

                if (message.SenderId != request.AuthUserId)
                    throw new Forbidden403Exception("Message can be recoverd only by its sender.");

                message.Recover();
                await _hubContext.Clients.Group(request.ChatId).SendAsync(ChatHub.RecoverMessage, message.Id, message.Text, cancellationToken);

                await _db.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}

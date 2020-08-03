using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat
{
    public class DeleteMessage
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

            public CommandHandler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var message = await _db.Chats
                    .Where(x => x.Id == request.ChatId)
                    .SelectMany(x => x.Messages)
                    .SingleOrNotFoundAsync(x => x.Id == request.MessageId, cancellationToken);

                if (message.SenderId != request.AuthUserId)
                    throw new Forbidden403Exception("Message can be deleted only by its sender.");

                message.SetDeleted();

                await _db.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}

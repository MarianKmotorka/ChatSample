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
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat
{
    public class MakeParticipantAdmin
    {
        public class Command : IRequest
        {
            public string ChatId { get; set; }

            public string ParticipantId { get; set; }

            [JsonIgnore]
            public string RequesterId { get; set; }
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

                Validate(chat.Participants, request);

                var participant = chat.Participants.Single(x => x.UserId == request.ParticipantId);
                participant.MakeUserAdmin();

                await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.ChangeParticipantRole, chat.Id, participant.UserId, ChatRole.Admin);
                await _db.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }

            private void Validate(IReadOnlyCollection<ChatUser> participants, Command request)
            {
                var requester = participants.SingleOrDefault(x => x.UserId == request.RequesterId);

                if (requester is null || requester.Role != ChatRole.Admin)
                    throw new Forbidden403Exception("You must be chat ADMIN.");

                if (participants.Any(x => x.UserId == request.ParticipantId) == false)
                    throw new BadRequestException($"User with id [{request.ParticipantId}] is not part of a chat.");
            }
        }
    }
}

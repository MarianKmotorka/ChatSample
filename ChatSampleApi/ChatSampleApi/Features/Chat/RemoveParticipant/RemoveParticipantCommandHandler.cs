using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat.RemoveParticipant
{
    public class RemoveParticipantCommandHandler : IRequestHandler<RemoveParticipantCommand>
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public RemoveParticipantCommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(RemoveParticipantCommand request, CancellationToken cancellationToken)
        {
            var chat = await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId);
            var participant = chat.Participants.SingleOrDefault(x => x.UserId == request.ParticipantId);

            _ = participant ?? throw new BadRequestException($"Participant with id ({request.ParticipantId}) does not exist");

            chat.RemoveParticipant(participant);

            if (!chat.Participants.Any())
                _db.Remove(chat);

            await _db.SaveChangesAsync(cancellationToken);
            await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.DeleteParticipant, chat.Id, participant.UserId, cancellationToken);
            await RemoveUserConnectionsFromGroup(request.ParticipantId, chat.Id);

            return Unit.Value;
        }

        private async Task RemoveUserConnectionsFromGroup(string userId, string groupName)
        {
            if (!ChatHub.UserConnections.ContainsKey(userId))
                return;

            foreach (var connectionId in ChatHub.UserConnections[userId])
                await _hubContext.Groups.RemoveFromGroupAsync(connectionId, groupName);
        }
    }
}

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

            Validate(chat.Participants, request.RequesterId, participant);

            chat.RemoveParticipant(participant);

            if (!chat.Participants.Any())
                _db.Remove(chat);

            await _db.SaveChangesAsync(cancellationToken);
            await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.DeleteParticipant, chat.Id, participant.UserId, cancellationToken);
            await RemoveUserConnectionsFromGroup(request.ParticipantId, chat.Id);

            return Unit.Value;
        }

        private void Validate(IReadOnlyCollection<ChatUser> participants, string requesterId, ChatUser participantToBeRemoved)
        {
            var requester = participants.SingleOrDefault(x => x.UserId == requesterId);

            if (requester.UserId == participantToBeRemoved.UserId)
                return;

            _ = participantToBeRemoved ?? throw new BadRequestException($"Participant does not exist.");

            if (requester.Role != ChatRole.Admin)
                throw new Forbidden403Exception("Only participants in ADMIN role can remove participant.");

            if (participantToBeRemoved.Role == ChatRole.Admin)
                throw new BadRequestException("Participant in ADMIN role cannot be removed.");

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

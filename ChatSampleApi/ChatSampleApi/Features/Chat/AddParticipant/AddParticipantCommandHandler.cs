using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat.AddParticipant
{
    public class AddParticipantCommandHandler : IRequestHandler<AddParticipantCommand>
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public AddParticipantCommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(AddParticipantCommand request, CancellationToken cancellationToken)
        {
            var chat = await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId);
            var user = await _db.Users.SingleOrNotFoundAsync(x => x.Id == request.ParticipantId);

            var participant = chat.AddParticipant(user);
            await _db.SaveChangesAsync();

            if (ChatHub.UserConnections.TryGetValue(participant.Id, out var connections))
                foreach (var connection in connections)
                    await _hubContext.Groups.AddToGroupAsync(connection, chat.Id, cancellationToken);

            await _hubContext.Clients.Group(chat.Id).SendAsync(
                ChatHub.RecieveParticipant,
                new GetMyChatsList.ChatDto
                {
                    Id = chat.Id,
                    Name = chat.Name,
                    UnreadMessages = 0
                },
                new GetMyChat.GetMyChatResponse.ParticipantDto
                {
                    Id = participant.Id,
                    Name = participant.FullName,
                    Picture = participant.Picture,
                    IsOnline = participant.IsOnline
                });

            return Unit.Value;
        }
    }
}

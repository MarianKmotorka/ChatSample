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

            chat.AddParticipant(user);
            await _db.SaveChangesAsync();

            await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.GetParticipants, chat.Id);

            return Unit.Value;
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat.SendMessage
{
    public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand>
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public SendMessageCommandHandler(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            var chat = await _db.Chats
                .Include(x => x.Messages)
                .Include(x => x.Participants)
                .SingleOrNotFoundAsync(x => x.Id == request.ChatId);

            var sender = await _db.Users.FindAsync(request.UserId);

            chat.AddMessage(sender, request.Text);
            await _db.SaveChangesAsync();

            await _hubContext.Clients.Group(chat.Id).SendAsync("GetMessages", chat.Id);

            return Unit.Value;
        }
    }
}

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
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
                .Include(x => x.Participants)
                .ThenInclude(x => x.User)
                .SingleOrNotFoundAsync(x => x.Id == request.ChatId);

            var sender = await _db.Users.FindAsync(request.UserId);

            if (chat.Participants.All(x => x.UserId != sender.Id))
                throw new Forbidden403Exception("You are not chat participant.");

            var message = chat.AddMessage(sender, request.Text);
            await _db.SaveChangesAsync();

            await _hubContext.Clients.Group(chat.Id).SendAsync(ChatHub.RecieveMessage, chat.Id, new GetMessages.MessageDto
            {
                Date = message.SentDate,
                Id = message.Id,
                SenderId = message.Sender.Id,
                SenderName = message.Sender.FullName,
                SenderPicture = message.Sender.Picture,
                Text = message.Text
            });

            return Unit.Value;
        }
    }
}

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace ChatSampleApi.Features.Chat.GetMyChat
{
    public class GetMyChatQueryHandler : IRequestHandler<GetMyChatQuery, GetMyChatResponse>
    {
        private readonly DatabaseContext _db;

        public GetMyChatQueryHandler(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<GetMyChatResponse> Handle(GetMyChatQuery request, CancellationToken cancellationToken)
        {
            var chat = await _db.Chats
                .Include(x => x.Messages)
                    .ThenInclude(x => x.Sender)
                .Include(x => x.Participants)
                    .ThenInclude(x => x.UnreadMessages)
                .Include(x => x.Participants)
                    .ThenInclude(x => x.User)
                .SingleOrNotFoundAsync(x => x.Id == request.ChatId);

            if (!chat.Participants.Any(x => x.UserId == request.UserId))
                throw new Forbidden403Exception();

            chat.SetMessagesAsReadForParticipant(request.UserId);
            await _db.SaveChangesAsync(cancellationToken);

            return new GetMyChatResponse
            {
                Id = chat.Id,
                Messages = chat.Messages.Select(m => new GetMyChatResponse.MessageDto
                {
                    Id = m.Id,
                    IsMyMessage = m.Sender.Id == request.UserId,
                    SenderId = m.Sender.Id,
                    SenderName = m.Sender.FullName,
                    SenderPicture = m.Sender.Picture,
                    Text = m.Text,
                    Date = m.SentDate
                })
                .OrderBy(m => m.Date),
                Participants = chat.Participants.Select(p => new GetMyChatResponse.ParticipantDto
                {
                    Id = p.UserId,
                    Name = p.User.FullName,
                    Picture = p.User.Picture
                })
            };
        }
    }
}

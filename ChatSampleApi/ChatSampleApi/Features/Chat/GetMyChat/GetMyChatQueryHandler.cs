using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
            var response = await _db.Chats.Select(chat => new GetMyChatResponse
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
                    Picture = p.User.Picture,
                    IsOnline = p.User.IsOnline,
                    ChatRole = p.Role
                })
            })
            .SingleOrNotFoundAsync(x => x.Id == request.ChatId);


            if (response.Participants.All(x => x.Id != request.UserId))
                throw new Forbidden403Exception();

            var user =
                await _db.Users.Include(x => x.UnreadMessages).ThenInclude(x => x.Message).SingleOrNotFoundAsync(x => x.Id == request.UserId);

            user.SetUnreadMessagesAsRead(request.ChatId);
            await _db.SaveChangesAsync(cancellationToken);

            return response;
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat.GetMessages
{
    public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, IEnumerable<MessageDto>>
    {
        private readonly DatabaseContext _db;

        public GetMessagesQueryHandler(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
        {
            var messages = await _db.Messages
               .Where(x => x.Chat.Id == request.ChatId)
               .OrderBy(x => x.SentDate)
               .Skip(request.Offset * request.Count)
               .Take(request.Count)
               .Select(m => new MessageDto
               {
                   Id = m.Id,
                   IsMyMessage = m.Sender.Id == request.UserId,
                   SenderName = m.Sender.FullName,
                   SenderPicture = m.Sender.Picture,
                   Text = m.Text,
                   Date = m.SentDate
               })
               .ToListAsync();

            return messages;
        }
    }
}

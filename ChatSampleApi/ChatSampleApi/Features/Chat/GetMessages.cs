using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class GetMessages
    {
        public class Query : IRequest<List<MessageDto>>
        {
            public string ChatId { get; set; }

            public string UserId { get; set; }

            public int Skip { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<MessageDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<List<MessageDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var participants =
                    (await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId)).Participants;

                if (!participants.Any(x => x.UserId == request.UserId))
                    throw new Forbidden403Exception("You are not chat participant.");

                var user =
                    await _db.Users.Include(x => x.UnreadMessages).ThenInclude(x => x.Message).SingleOrNotFoundAsync(x => x.Id == request.UserId);

                user.SetUnreadMessagesAsRead(request.ChatId);
                await _db.SaveChangesAsync(cancellationToken);

                return
                    await _db.Messages
                        .Where(x => x.ChatId == request.ChatId)
                        .Select(m => new MessageDto
                        {
                            Id = m.Id,
                            IsMyMessage = m.Sender.Id == request.UserId,
                            SenderId = m.Sender.Id,
                            SenderName = m.Sender.FullName,
                            SenderPicture = m.Sender.Picture,
                            Text = m.Text,
                            Date = m.SentDate
                        })
                        .OrderByDescending(x => x.Date)
                        .Skip(request.Skip)
                        .Take(25)
                        .OrderBy(x => x.Date)
                        .ToListAsync(cancellationToken);
            }
        }

        public class MessageDto
        {
            public string Id { get; set; }

            public string SenderId { get; set; }

            public string SenderName { get; set; }

            public string SenderPicture { get; set; }

            public bool IsMyMessage { get; set; }

            public string Text { get; set; }

            public DateTime Date { get; set; }
        }
    }
}

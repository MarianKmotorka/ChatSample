using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Pagination;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class GetMessages
    {
        public class Query : IRequest<PagedResponse<MessageDto>>
        {
            public string ChatId { get; set; }

            public string UserId { get; set; }

            public PaginationQuery PaginationQuery { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedResponse<MessageDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<PagedResponse<MessageDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var participants = (await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId)).Participants;

                if (!participants.Any(x => x.UserId == request.UserId))
                    throw new Forbidden403Exception("You are not chat participant.");

                var user = await _db.Users.Include(x => x.UnreadMessages).ThenInclude(x => x.Message).SingleOrNotFoundAsync(x => x.Id == request.UserId, cancellationToken);
                user.SetUnreadMessagesAsRead(request.ChatId);
                await _db.SaveChangesAsync(cancellationToken);

                var messagesQuery = _db.Messages.Where(x => x.ChatId == request.ChatId);
                var response = await PaginationProcessor.GetPagedResponse(messagesQuery, request.PaginationQuery, MessageDto.GetMapper(user.Id), x => x.Date, false, cancellationToken);

                response.Data = RemoveDeletedMessagesText(response.Data.OrderBy(x => x.Date).ToList());
                return response;
            }

            private List<MessageDto> RemoveDeletedMessagesText(List<MessageDto> messages)
            {
                foreach (var message in messages)
                    if (message.IsDeleted)
                        message.Text = string.Empty;

                return messages;
            }
        }

        public class ResponseDto
        {
            public List<MessageDto> Data { get; set; }

            public int TotalCount { get; set; }
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

            public bool IsDeleted { get; set; }

            public static Expression<Func<Message, MessageDto>> GetMapper(string userId)
            {
                return m => new MessageDto
                {
                    Id = m.Id,
                    IsMyMessage = m.Sender.Id == userId,
                    SenderId = m.Sender.Id,
                    SenderName = m.Sender.FullName,
                    SenderPicture = m.Sender.Picture,
                    Text = m.Text,
                    Date = m.SentDate,
                    IsDeleted = m.IsDeleted
                };
            }
        }
    }
}

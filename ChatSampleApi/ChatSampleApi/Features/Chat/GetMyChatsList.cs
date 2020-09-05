using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Pagination;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class GetMyChatsList
    {
        public class Query : IRequest<PagedResponse<ChatDto>>
        {
            public string UserId { get; set; }

            public PaginationQuery PaginationQuery { get; set; }

            public string NameFilter { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedResponse<ChatDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<PagedResponse<ChatDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chatsQuery = _db.Chats
                    .Where(x => x.Participants.Any(p => p.UserId == request.UserId))
                    .OrderByDescending(x => x.Messages.Max(m => m.SentDate))
                    .Select(x => new ChatDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        ChatRole = x.Participants.Single(p => p.UserId == request.UserId).Role
                    });

                if (!string.IsNullOrEmpty(request.NameFilter))
                    chatsQuery = chatsQuery.Where(x => x.Name.ToLower().Contains(request.NameFilter.ToLower()));

                var pagedChats = await PaginationProcessor.GetPagedResponse((IOrderedQueryable<ChatDto>)chatsQuery, request.PaginationQuery, cancellationToken);

                var unreadMessages = await _db.Users.Include(x => x.UnreadMessages)
                    .ThenInclude(x => x.Message)
                    .Where(x => x.Id == request.UserId)
                    .SelectMany(x => x.UnreadMessages)
                    .ToListAsync(cancellationToken);


                pagedChats.Data.ForEach(x => x.UnreadMessages = unreadMessages.Where(m => m.Message.ChatId == x.Id).Count());
                return pagedChats;
            }
        }

        public class ChatDto
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public int UnreadMessages { get; set; }

            public ChatRole ChatRole { get; set; }
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class GetMyChatsList
    {
        public class Query : IRequest<List<ChatDto>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ChatDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<List<ChatDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chats = await _db.Chats
                    .Where(x => x.Participants.Any(p => p.UserId == request.UserId))
                    .Select(x => new ChatDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UnreadMessages = x.Participants.Single(p => p.UserId == request.UserId).User.UnreadMessages.Count
                    })
                    .ToListAsync();

                return chats;
            }
        }

        public class ChatDto
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public int UnreadMessages { get; set; }
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ChatSampleApi.Features.Chat
{
    public class GetNewParticipantsSelector
    {
        public class Query : IRequest<List<UserDto>>
        {
            public string ChatId { get; set; }

            public string Text { get; set; }

            [JsonIgnore]
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<List<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chat = await _db.Chats.Include(x => x.Participants).SingleOrNotFoundAsync(x => x.Id == request.ChatId);
                var participantIds = chat.Participants.Select(x => x.UserId);

                var query = _db.Users.Where(x => !participantIds.Contains(x.Id))
                    .Select(x => new UserDto
                    {
                        Id = x.Id,
                        Name = x.FullName,
                        Picture = x.Picture
                    });

                if (!string.IsNullOrEmpty(request.Text))
                    query = query.Where(x => x.Name.ToLower().Contains(request.Text.ToLower()));

                return await query.Take(25).ToListAsync(cancellationToken);
            }
        }

        public class UserDto
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public string Picture { get; set; }
        }
    }
}

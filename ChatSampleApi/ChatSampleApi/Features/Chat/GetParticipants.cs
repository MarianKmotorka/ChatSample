using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Chat
{
    public class GetParticipants
    {
        public class Query : IRequest<List<ParticipantDto>>
        {
            public string UserId { get; set; }

            public string ChatId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ParticipantDto>>
        {
            private readonly DatabaseContext _db;

            public Handler(DatabaseContext db)
            {
                _db = db;
            }

            public async Task<List<ParticipantDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var participants = (
                            await _db.Chats
                            .Include(x => x.Participants)
                            .ThenInclude(x => x.User)
                            .SingleOrNotFoundAsync(x => x.Id == request.ChatId)
                            ).Participants;


                if (!participants.Any(x => x.UserId == request.UserId))
                    throw new Forbidden403Exception("You are not chat participant.");

                return participants.Select(p => new ParticipantDto
                {
                    Id = p.UserId,
                    Name = p.User.FullName,
                    Picture = p.User.Picture,
                    IsOnline = p.User.IsOnline,
                    ChatRole = p.Role
                })
                .ToList();
            }
        }

        public class ParticipantDto
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public string Picture { get; set; }

            public bool IsOnline { get; set; }

            public ChatRole ChatRole { get; set; }
        }
    }
}

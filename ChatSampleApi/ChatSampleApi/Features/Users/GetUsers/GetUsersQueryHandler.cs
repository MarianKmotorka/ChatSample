using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Features.Users.GetUsers
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
    {
        private readonly DatabaseContext _db;

        public GetUsersQueryHandler(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var query = _db.Users.Select(x => new UserDto { Id = x.Id, Name = x.FullName, Picture = x.Picture });

            if (!string.IsNullOrEmpty(request.Text))
                query = query.Where(x => x.Name.ToLower().Contains(request.Text.ToLower()));

            return await query.OrderBy(x => x.Name).Take(25).ToListAsync();
        }
    }
}

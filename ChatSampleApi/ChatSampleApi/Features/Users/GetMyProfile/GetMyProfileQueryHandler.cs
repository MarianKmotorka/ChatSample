using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using MediatR;

namespace ChatSampleApi.Features.Profile.GetMyProfile
{
    public class GetMyProfileQueryHandler : IRequestHandler<GetMyProfileQuery, GetMyProfileResponse>
    {
        private readonly DatabaseContext _db;

        public GetMyProfileQueryHandler(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<GetMyProfileResponse> Handle(GetMyProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _db.Users.FindAsync(request.UserId);
            return new GetMyProfileResponse
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.FullName,
                Picture = user.Picture
            };
        }
    }
}

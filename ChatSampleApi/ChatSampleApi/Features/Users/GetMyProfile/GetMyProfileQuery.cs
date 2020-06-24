using MediatR;

namespace ChatSampleApi.Features.Profile.GetMyProfile
{
    public class GetMyProfileQuery : IRequest<GetMyProfileResponse>
    {
        public string UserId { get; set; }
    }
}

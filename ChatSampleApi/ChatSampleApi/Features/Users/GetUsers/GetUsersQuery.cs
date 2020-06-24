using System.Collections.Generic;
using MediatR;

namespace ChatSampleApi.Features.Users.GetUsers
{
    public class GetUsersQuery : IRequest<IEnumerable<UserDto>>
    {
        public string Text { get; set; }
    }
}

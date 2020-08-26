using Microsoft.AspNetCore.Http;

namespace ChatSampleApi.Services
{
    public interface ICurrentUserService
    {
        string UserId { get; }

        HttpContext HttpContext { get; }
    }
}

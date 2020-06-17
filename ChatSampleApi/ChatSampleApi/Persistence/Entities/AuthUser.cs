using Microsoft.AspNetCore.Identity;

namespace ChatSampleApi.Persistence.Entities
{
    public class AuthUser : IdentityUser<string>
    {
        public string FullName { get; set; }

        public string Picture { get; set; }
    }
}

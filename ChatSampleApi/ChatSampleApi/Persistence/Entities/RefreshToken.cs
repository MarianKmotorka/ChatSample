using System;

namespace ChatSampleApi.Persistence.Entities
{
    public class RefreshToken
    {
        public string Token { get; set; } = Guid.NewGuid().ToString();

        public string JwtId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public bool Used { get; set; }
    }
}

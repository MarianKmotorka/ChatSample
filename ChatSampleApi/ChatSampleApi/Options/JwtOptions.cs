using System;

namespace ChatSampleApi.Options
{
    public class JwtOptions
    {
        public TimeSpan TokenLifeTime { get; set; } = TimeSpan.FromMinutes(15);

        public TimeSpan RefreshTokenLifeTime { get; set; } = TimeSpan.FromDays(7);

        public string Secret { get; set; }

        public string Issuer { get; set; } = "ChatSample-Dzony";
    }
}

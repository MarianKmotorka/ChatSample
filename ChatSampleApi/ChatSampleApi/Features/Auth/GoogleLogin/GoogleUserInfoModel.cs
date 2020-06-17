using Newtonsoft.Json;

namespace ChatSampleApi.Features.Auth.GoogleLogin
{
    public class GoogleUserInfoModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        [JsonProperty("verified_email")]
        public bool IsEmailVerified { get; set; }

        public string Name { get; set; }

        [JsonProperty("given_name")]
        public string GivenName { get; set; }

        [JsonProperty("family_name")]
        public string FamilyName { get; set; }

        [JsonProperty("picture")]
        public string PictureUrl { get; set; }

        public string Locale { get; set; }
    }
}

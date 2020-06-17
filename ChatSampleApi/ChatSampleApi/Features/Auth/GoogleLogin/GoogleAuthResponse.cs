using Newtonsoft.Json;

namespace ChatSampleApi.Features.Auth.GoogleLogin
{
    public class GoogleAuthResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }
    }
}

namespace ChatSampleApi.Features.Auth.GoogleLogin
{
    public class GoogleLoginResponse
    {
        public string Jwt { get; set; }

        public string RefreshToken { get; set; }
    }
}

namespace ChatSampleApi.Options
{
    public class GoogleOAuthOptions
    {
        public string GoogleClientId { get; set; }

        public string GoogleClientSecret { get; set; }

        public string UserInfoEndpoint { get; set; }

        public string TokenEndpoint { get; set; }

        public string ClientRedirectUri { get; set; }
    }
}

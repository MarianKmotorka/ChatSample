﻿namespace ChatSampleApi.Features.Auth.RefreshToken
{
    public class RefreshTokenResponse
    {
        public string Jwt { get; set; }

        public string RefreshToken { get; set; }
    }
}
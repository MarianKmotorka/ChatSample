using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Options;
using ChatSampleApi.Persistence;
using ChatSampleApi.Services;
using MediatR;

namespace ChatSampleApi.Features.Auth.GoogleLogin
{
    public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommand, GoogleLoginResponse>
    {
        private readonly DatabaseContext _db;
        private readonly GoogleOAuthOptions _oAuthOptions;
        private readonly AuthService _authService;
        private readonly HttpClient _httpClient;

        public GoogleLoginCommandHandler(DatabaseContext db, GoogleOAuthOptions oAuthOptions,
            IHttpClientFactory clientFactory, AuthService authService)
        {
            _db = db;
            _oAuthOptions = oAuthOptions;
            _authService = authService;
            _httpClient = clientFactory.CreateClient();
        }

        public async Task<GoogleLoginResponse> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
        {
            var googleRequest = new
            {
                code = request.Code,
                client_id = _oAuthOptions.GoogleClientId,
                client_secret = _oAuthOptions.GoogleClientSecret,
                grant_type = "authorization_code",
                redirect_uri = _oAuthOptions.ClientRedirectUri
            };

            var response = await _httpClient.PostAsJsonAsync(_oAuthOptions.TokenEndpoint, googleRequest);
            var authResponse = await response.Content.ReadAsAsync<GoogleAuthResponse>();

            if (!response.IsSuccessStatusCode)
                throw new BadRequestException("Invalid code");

            var userInfoRequest = new HttpRequestMessage()
            {
                Method = new HttpMethod("GET"),
                Headers = { { HttpRequestHeader.Authorization.ToString(), $"{authResponse.TokenType} {authResponse.AccessToken}" } },
                RequestUri = new Uri(_oAuthOptions.UserInfoEndpoint)
            };

            response = await _httpClient.SendAsync(userInfoRequest);
            var userInfoResponse = await response.Content.ReadAsAsync<GoogleUserInfoModel>();

            var (jwt, refreshToken) = await _authService.LoginWithGoogle(userInfoResponse);

            return new GoogleLoginResponse { Jwt = jwt, RefreshToken = refreshToken };
        }
    }
}

using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatSampleApi.Options;
using ChatSampleApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace ChatSampleApi
{
    public static class StartupExtensions
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = new JwtOptions();
            configuration.GetSection(nameof(JwtOptions)).Bind(jwtOptions);
            services.AddSingleton(jwtOptions);

            var oAuthOptions = new GoogleOAuthOptions();
            configuration.GetSection(nameof(GoogleOAuthOptions)).Bind(oAuthOptions);
            services.AddSingleton(oAuthOptions);

            var tokenValidationParams = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret)),
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtOptions.Issuer,
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddSingleton(tokenValidationParams);

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = tokenValidationParams;

                o.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;

                        if (string.IsNullOrEmpty(accessToken))
                            accessToken = context.HttpContext.Request.Cookies[AuthCookies.AccessToken];

                        if (!string.IsNullOrEmpty(accessToken))
                            context.Token = accessToken;

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        var isAccessTokenClaim = context.Principal.Claims.SingleOrDefault(x => x.Type == AuthService.IsAccessTokenClaim);

                        if (isAccessTokenClaim is null)
                            context.Fail(new Exception("Token is missing 'IsAccessToken' claim."));

                        return Task.CompletedTask;
                    }
                };

                o.SaveToken = true;
            });

            services.AddScoped<AuthService>();

            return services;
        }
    }
}

using System.Reflection;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.Middleware;
using ChatSampleApi.Middleware.Authorization;
using ChatSampleApi.Middleware.ErrorHandling;
using ChatSampleApi.Persistence;
using ChatSampleApi.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ChatSampleApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddJwtAuthentication(Configuration);
            services.AddAuthorization(cfg =>
            {
                cfg.AddPolicy("ChatParticipantPolicy", x => x.Requirements.Add(new ChatParticipantRequirement()));
            });
            services.AddScoped<IAuthorizationHandler, ChatParticipantHandler>();

            services.AddHttpClient();
            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddDbContext<DatabaseContext>(o =>
                o.UseSqlServer(Configuration.GetConnectionString("DatabaseContext")));

            services.AddControllers();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(config =>
                {
                    config.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            }
            else
                app.UseHsts();

            app.UseCustomExceptionHandlingMiddleware();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(cfg =>
            {
                cfg.MapControllers();
                cfg.MapHub<ChatHub>(ChatHub.ApiPath);
            });
        }
    }
}

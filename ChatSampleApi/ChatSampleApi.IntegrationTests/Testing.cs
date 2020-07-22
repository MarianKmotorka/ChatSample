using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;
using ChatSampleApi.Services;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using Respawn;

namespace ChatSampleApi.IntegrationTests
{
    [SetUpFixture]
    public class Testing
    {
        private static IConfigurationRoot _configuration;
        private static IServiceScopeFactory _scopeFactory;
        private static Checkpoint _checkpoint;
        private static AuthUser _currentUser;
        private static DatabaseContext _arrangeDb;
        private static DatabaseContext _actDb;
        private static DatabaseContext _assertDb;

        public static DatabaseContext ArrangeDb
        {
            get => _arrangeDb ??= _scopeFactory.CreateScope().ServiceProvider.GetService<DatabaseContext>();
            set => _arrangeDb = value;
        }

        public static DatabaseContext ActDb
        {
            get => _actDb ??= _scopeFactory.CreateScope().ServiceProvider.GetService<DatabaseContext>();
            set => _actDb = value;
        }

        public static DatabaseContext AssertDb
        {
            get => _assertDb ??= _scopeFactory.CreateScope().ServiceProvider.GetService<DatabaseContext>();
            set => _assertDb = value;
        }

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            var services = new ServiceCollection();

            var startup = new Startup(_configuration);

            services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
                w.EnvironmentName == "Development" &&
                w.ApplicationName == "ChatSampleApi"));

            startup.ConfigureServices(services);

            var currentUserServiceDescriptor = services.FirstOrDefault(d =>
                d.ServiceType == typeof(ICurrentUserService));

            // Mock CurrentUserService
            services.Remove(currentUserServiceDescriptor);
            services.AddScoped(provider =>
                Mock.Of<ICurrentUserService>(s => s.UserId == _currentUser.Id));

            _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();

            _checkpoint = new Checkpoint
            {
                TablesToIgnore = new[] { "__EFMigrationsHistory" }
            };

            EnsureDatabase();
        }

        private void EnsureDatabase()
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<DatabaseContext>();

            context.Database.Migrate();
        }

        public static async Task ResetState()
        {
            await _checkpoint.Reset(_configuration.GetConnectionString("DatabaseContext"));

            _currentUser = null;
        }

        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using var scope = _scopeFactory.CreateScope();

            var mediator = scope.ServiceProvider.GetService<IMediator>();

            return await mediator.Send(request);
        }

        public static async Task<AuthUser> RunAsDefaultUserAsync()
        {
            var user = new AuthUser("user@chatSample");
            ArrangeDb.Add(user);

            await ArrangeDb.SaveChangesAsync();

            _currentUser = user;
            return _currentUser;
        }
    }
}

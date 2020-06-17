using ChatSampleApi.Persistence.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Persistence
{
    public class DatabaseContext : IdentityDbContext<AuthUser, IdentityRole, string>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RefreshToken>().HasKey(x => x.Token);
            builder.Entity<AuthUser>().ToTable("AuthUser");
        }
    }
}

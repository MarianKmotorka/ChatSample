﻿using ChatSampleApi.Persistence.Entities;
using ChatSampleApi.Persistence.Entities.JunctionEntities;
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

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RemovePluralizingTableNameConvention();
            base.OnModelCreating(builder);

            builder.Entity<RefreshToken>().HasKey(x => x.Token);

            builder.Entity<AuthUser>(y =>
            {
                y.ToTable("AuthUser");
                y.HasMany(x => x.UnreadMessages).WithOne(x => x.User).Metadata.PrincipalToDependent.SetPropertyAccessMode(PropertyAccessMode.Field);
            });

            builder.Entity<ChatUser>(x =>
            {
                x.ToTable("ChatUsers");
                x.HasKey(y => new { y.ChatId, y.UserId });
                x.HasOne(y => y.Chat).WithMany(y => y.Participants).OnDelete(DeleteBehavior.Cascade);
                x.HasOne(y => y.User).WithMany().OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<UserUnreadMessage>(x =>
            {
                x.ToTable("UserUnreadMessages");
                x.HasKey(y => new { y.MessageId, y.UserId });
                x.HasOne(y => y.Message).WithMany().OnDelete(DeleteBehavior.Cascade);
                x.HasOne(y => y.User).WithMany(y => y.UnreadMessages).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Chat>(y =>
            {
                y.HasMany(x => x.Messages).WithOne().OnDelete(DeleteBehavior.Cascade);
                y.Property(x => x.Id).ValueGeneratedOnAdd();
            });

            builder.Entity<Message>(y =>
            {
                y.Property(x => x.Id).ValueGeneratedOnAdd();
                y.HasOne(x => x.Chat).WithMany(x => x.Messages).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}

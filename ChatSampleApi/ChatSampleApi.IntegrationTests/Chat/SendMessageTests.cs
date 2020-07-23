using System;
using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Features.Chat.SendMessage;
using ChatSampleApi.IntegrationTests.Assets;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace ChatSampleApi.IntegrationTests.Chat
{
    using static Testing;

    public class SendMessageTests : TestBase
    {
        [Test]
        public async Task WhenSendingMessage_MessageIsSaved()
        {
            var user = await RunAsDefaultUserAsync();
            var chat = ArrangeDb.SeedWorkChat(user);
            await ArrangeDb.SaveChangesAsync();

            var request = new SendMessageCommand { ChatId = chat.Id, Text = "test message", UserId = user.Id };
            await SendAsync(request);

            var chatDb = await AssertDb.Chats.Include(x => x.Messages).SingleAsync();
            var message = chatDb.Messages.Single();

            message.Should().BeEquivalentTo(new
            {
                SenderId = user.Id,
                Text = "test message",
                ChatId = chat.Id
            });

            message.SentDate.Should().BeCloseTo(DateTime.Now, 5000);
        }

        [Test]
        public async Task GivenUserThatIsNotChatParticipant_WhenSendingMessage_ForbiddenExceptionIsThrown()
        {
            var user = await RunAsDefaultUserAsync();
            var bob = ArrangeDb.SeedBobJohnes();
            var chat = ArrangeDb.SeedWorkChat(user);
            await ArrangeDb.SaveChangesAsync();

            var request = new SendMessageCommand { ChatId = chat.Id, Text = "test message", UserId = bob.Id };

            await FluentActions.Invoking(async () => await SendAsync(request)).Should().ThrowAsync<Forbidden403Exception>();
        }
    }
}

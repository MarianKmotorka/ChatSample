using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Features.Chat.CreateChat;
using ChatSampleApi.Persistence.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace ChatSampleApi.IntegrationTests.Chat
{
    using static Testing;

    public class CreateChatTests : TestBase
    {
        [Test]
        public async Task WhenValidDataProvided_ChatIsCreated_AndCreatorIsSetAsAdmin()
        {
            var user = await RunAsDefaultUserAsync();

            await SendAsync(new CreateChatCommand { Name = "chat1", UserId = user.Id });

            var chatDb = await AssertDb.Chats.Include(x => x.Participants).SingleAsync();
            chatDb.Name.Should().Be("chat1");
            chatDb.Participants.First().Role.Should().Be(ChatRole.Admin);
            chatDb.Participants.First().UserId.Should().Be(user.Id);
        }

        [Test]
        public async Task WhenNoNameProvided_ThrowsBadRequestException()
        {
            var user = await RunAsDefaultUserAsync();
            var request = new CreateChatCommand { Name = string.Empty, UserId = user.Id };

            await FluentActions.Invoking(async () => await SendAsync(request)).Should().ThrowAsync<BadRequestException>();
        }
    }
}

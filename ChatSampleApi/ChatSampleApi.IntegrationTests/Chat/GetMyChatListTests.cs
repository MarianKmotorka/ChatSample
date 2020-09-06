using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Features.Chat;
using FluentAssertions;
using NUnit.Framework;

namespace ChatSampleApi.IntegrationTests.Chat
{
    using static Testing;

    public class GetMyChatListTests : TestBase
    {
        [Test]
        public async Task GivenSomeChatsSavedInDb_ReturnsOnlyChatsWhereUserIsParticipant()
        {
            // Arrange
            var user = await RunAsDefaultUserAsync();
            var chat1 = new Persistence.Entities.Chat("Chat1");
            var chat2 = new Persistence.Entities.Chat("Chat2");
            chat2.AddParticipant(user);

            ArrangeDb.AddRange(chat1, chat2);
            await ArrangeDb.SaveChangesAsync();

            var query = new GetMyChatsList.Query { UserId = user.Id, PaginationQuery = new Pagination.PaginationQuery() };

            // Act
            var response = await SendAsync(query);

            // Assert
            response.Data.Should().HaveCount(1);
            response.Data.First().Id.Should().Be(chat2.Id);
        }
    }
}

using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.IntegrationTests.Assets;
using FluentAssertions;
using NUnit.Framework;

namespace ChatSampleApi.IntegrationTests.Chat
{
    using static Testing;
    using static UserAssets;

    public class GetNewParticipantsSelectorTests : TestBase
    {
        [Test]
        public async Task ReturnsUsersThatAreNotParticipantsAlready()
        {
            var user = await RunAsDefaultUserAsync();
            var adele = ArrangeDb.SeedAdeleVance();
            var chat = ArrangeDb.SeedWorkChat(user, BobJohnes, JohnCena);
            await ArrangeDb.SaveChangesAsync();

            var request = new GetNewParticipantsSelector.Query
            {
                ChatId = chat.Id,
                UserId = user.Id
            };

            var response = await SendAsync(request);

            response.Single().Id.Should().Be(adele.Id);
        }

        [Test]
        public async Task WhenRequesterIsNotChatParticipant_ThrowsForbidden403Exception()
        {
            var user = await RunAsDefaultUserAsync();
            var chat = ArrangeDb.SeedWorkChat(BobJohnes);
            await ArrangeDb.SaveChangesAsync();

            var request = new GetNewParticipantsSelector.Query
            {
                ChatId = chat.Id,
                UserId = user.Id
            };

            await FluentActions.Invoking(async () => await SendAsync(request)).Should().ThrowAsync<Forbidden403Exception>();
        }
    }
}

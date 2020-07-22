using System.Threading.Tasks;
using NUnit.Framework;

namespace ChatSampleApi.IntegrationTests
{
    using static Testing;

    public class TestBase
    {
        [SetUp]
        public async Task SetUp()
        {
            await ResetState();
        }

        [TearDown]
        public async Task TearDown()
        {
            await ArrangeDb.DisposeAsync();
            await ActDb.DisposeAsync();
            await AssertDb.DisposeAsync();

            ArrangeDb = null;
            ActDb = null;
            AssertDb = null;
        }
    }
}
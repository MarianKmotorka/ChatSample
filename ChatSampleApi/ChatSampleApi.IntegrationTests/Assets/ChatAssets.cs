using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;

namespace ChatSampleApi.IntegrationTests.Assets
{
    public static class ChatAssets
    {
        public static Persistence.Entities.Chat WorkChat(AuthUser creator, params AuthUser[] participants)
        {
            var chat = new Persistence.Entities.Chat("WorkChat");

            chat.AddAdmin(creator);

            foreach (var participant in participants)
                chat.AddParticipant(participant);

            return chat;
        }

        public static Persistence.Entities.Chat SeedWorkChat(this DatabaseContext db, AuthUser creator, params AuthUser[] participants)
        {
            var chat = WorkChat(creator, participants);
            db.Add(chat);
            return chat;
        }
    }
}

using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities;

namespace ChatSampleApi.IntegrationTests.Assets
{
    public static class UserAssets
    {
        public static AuthUser BobJohnes => new AuthUser("bob@johnes")
        {
            Id = "a4ab0e78-7189-4412-8a18-f3c476df135f",
            FullName = "Bob Johnes"
        };

        public static AuthUser AdeleVance => new AuthUser("adele@vance")
        {
            Id = "083d092d-e571-4db5-aa03-49d5daca2ef6",
            FullName = "Adele Vance"
        };

        public static AuthUser JohnCena => new AuthUser("john@cena")
        {
            Id = "024bca57-8a27-45b3-859c-cb47cbd862a8",
            FullName = "John Cena"
        };

        public static AuthUser SeedBobJohnes(this DatabaseContext db)
        {
            db.Users.Add(BobJohnes);
            return BobJohnes;
        }

        public static AuthUser SeedAdeleVance(this DatabaseContext db)
        {
            db.Users.Add(AdeleVance);
            return AdeleVance;
        }

        public static AuthUser SeedJohnCena(this DatabaseContext db)
        {
            db.Users.Add(JohnCena);
            return JohnCena;
        }
    }
}

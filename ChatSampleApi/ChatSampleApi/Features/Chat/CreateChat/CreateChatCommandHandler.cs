using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence;
using ChatSampleApi.Persistence.Entities.JunctionEntities;
using MediatR;

namespace ChatSampleApi.Features.Chat.CreateChat
{
    public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand>
    {
        private readonly DatabaseContext _db;

        public CreateChatCommandHandler(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<Unit> Handle(CreateChatCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Name))
                throw new BadRequestException("Name cannot be empty");

            var user = await _db.Users.FindAsync(request.UserId);

            var newChat = new Persistence.Entities.Chat
            {
                Name = request.Name,
                Participants = new[] { new ChatUser { User = user } }
            };

            _db.Chats.Add(newChat);
            await _db.SaveChangesAsync();

            return Unit.Value;
        }
    }
}

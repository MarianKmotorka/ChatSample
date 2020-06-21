using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.Features.Chat.CreateChat;
using ChatSampleApi.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Controllers
{
    [Authorize]
    [Route("api/chats")]
    public class ChatController : BaseController
    {
        private readonly DatabaseContext _db;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(DatabaseContext db, IHubContext<ChatHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        [HttpGet("mine")]
        public async Task<ActionResult> GetMyChats()
        {
            var userId = CurrentUserService.UserId;

            var chats = await _db.Chats.Where(x => x.Participants.Any(p => p.UserId == userId))
                .Select(x => new
                {
                    x.Id,
                    x.Name
                })
                .ToListAsync();

            return Ok(chats);
        }

        [HttpPost]
        public async Task<ActionResult> CreateChat(CreateChatCommand request)
        {
            request.UserId = CurrentUserService.UserId;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteChat(string id)
        {
            var chat = await _db.Chats.SingleOrNotFoundAsync(x => x.Id == id);
            _db.Chats.Remove(chat);
            await _db.SaveChangesAsync();

            await _hubContext.Clients.Group(chat.Id).SendAsync("GetChats");

            return NoContent();
        }
    }
}

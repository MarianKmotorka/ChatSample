using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.Features.Chat.AddParticipant;
using ChatSampleApi.Features.Chat.CreateChat;
using ChatSampleApi.Features.Chat.GetMessages;
using ChatSampleApi.Features.Chat.GetMyChat;
using ChatSampleApi.Features.Chat.SendMessage;
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
        public async Task<ActionResult<List<object>>> GetChats()
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

        [HttpGet("mine/{id}")]
        public async Task<ActionResult<GetMyChatResponse>> GetChat(string id)
        {
            var response = await Mediator.Send(new GetMyChatQuery { ChatId = id, UserId = CurrentUserService.UserId });
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateChat(CreateChatCommand request)
        {
            request.UserId = CurrentUserService.UserId;
            var chatId = await Mediator.Send(request);
            return Ok(chatId);
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

        [HttpPost("{id}/messages")]
        public async Task<ActionResult> SendMessage(string id, SendMessageCommand request)
        {
            request.ChatId = id;
            request.UserId = CurrentUserService.UserId;

            await Mediator.Send(request);
            return NoContent();
        }

        [HttpGet("{id}/messages")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages(string id, int? count, int? offSet)
        {
            var request = new GetMessagesQuery
            {
                ChatId = id,
                Count = count ?? 50,
                Offset = offSet ?? 0,
                UserId = CurrentUserService.UserId
            };

            var response = await Mediator.Send(request);
            return Ok(response);
        }

        [HttpPost("{id}/participants")]
        public async Task<ActionResult> AddParticipant(string id, [FromBody] AddParticipantCommand request)
        {
            request.ChatId = id;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpGet("{id}/participants")]
        public async Task<IEnumerable<GetMyChatResponse.ParticipantDto>> GetParticipants(string id)
        {
            var chat = await _db.Chats.Include(x => x.Participants).ThenInclude(x => x.User).SingleOrNotFoundAsync(x => x.Id == id);
            return chat.Participants.Select(x => new GetMyChatResponse.ParticipantDto
            {
                Id = x.User.Id,
                Name = x.User.FullName,
                Picture = x.User.Picture
            });
        }
    }
}

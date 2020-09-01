using System.Collections.Generic;
using System.Threading.Tasks;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.Features.Chat.AddParticipant;
using ChatSampleApi.Features.Chat.CreateChat;
using ChatSampleApi.Features.Chat.RemoveParticipant;
using ChatSampleApi.Features.Chat.SendMessage;
using ChatSampleApi.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Authorize]
    [Authorize(Policy = "ChatParticipantPolicy")]
    [Route("api/chats")]
    public class ChatController : BaseController
    {
        [HttpGet("mine")]
        public async Task<ActionResult<List<GetMyChatsList.ChatDto>>> GetChats()
        {
            var response = await Mediator.Send(new GetMyChatsList.Query { UserId = CurrentUserService.UserId });
            return Ok(response);
        }

        [HttpGet("{id}/messages")]
        public async Task<ActionResult<PagedResponse<GetMessages.MessageDto>>> GetMessages(string id, [FromQuery] PaginationQuery paginationQuery)
        {
            var request = new GetMessages.Query
            {
                ChatId = id,
                UserId = CurrentUserService.UserId,
                PaginationQuery = paginationQuery
            };

            var response = await Mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("{id}/participants")]
        public async Task<ActionResult<PagedResponse<GetParticipants.ParticipantDto>>> GetParticipants(string id)
        {
            var request = new GetParticipants.Query
            {
                ChatId = id,
                UserId = CurrentUserService.UserId,
            };

            var response = await Mediator.Send(request);
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
            await Mediator.Send(new DeleteChat.Command { ChatId = id, UserId = CurrentUserService.UserId });
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

        [HttpPost("{id}/participants")]
        public async Task<ActionResult> AddParticipant(string id, AddParticipantCommand request)
        {
            request.ChatId = id;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpDelete("{chatId}/participants/{participantId}")]
        public async Task<ActionResult> RemoveParticipant([FromRoute] RemoveParticipantCommand request)
        {
            request.RequesterId = CurrentUserService.UserId;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpGet("{id}/participants/new")]
        public async Task<ActionResult<IEnumerable<GetNewParticipantsSelector.UserDto>>> GetNewParticipantsSelector(string id, [FromQuery] GetNewParticipantsSelector.Query request)
        {
            request.ChatId = id;
            request.UserId = CurrentUserService.UserId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{chatId}/participants/{participantId}/set-admin-role")]
        public async Task<ActionResult> MakeParticipantAdmin([FromRoute] MakeParticipantAdmin.Command request)
        {
            request.RequesterId = CurrentUserService.UserId;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpDelete("{chatId}/messages/{messageId}")]
        public async Task<ActionResult> DeleteMessage([FromRoute] DeleteMessage.Command request)
        {
            request.AuthUserId = CurrentUserService.UserId;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpPut("{chatId}/messages/{messageId}/recover")]
        public async Task<ActionResult> RecoverMessage([FromRoute] RecoverMessage.Command request)
        {
            request.AuthUserId = CurrentUserService.UserId;
            await Mediator.Send(request);
            return NoContent();
        }

        [HttpPatch("{chatId}")]
        public async Task<ActionResult> RecoverMessage(string chatId, [FromBody] EditChat.Command request)
        {
            request.UserId = CurrentUserService.UserId;
            request.ChatId = chatId;
            await Mediator.Send(request);
            return NoContent();
        }
    }
}

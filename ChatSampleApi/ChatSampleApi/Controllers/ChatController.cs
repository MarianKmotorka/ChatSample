﻿using System.Collections.Generic;
using System.Threading.Tasks;
using ChatSampleApi.Features.Chat;
using ChatSampleApi.Features.Chat.AddParticipant;
using ChatSampleApi.Features.Chat.CreateChat;
using ChatSampleApi.Features.Chat.GetMyChat;
using ChatSampleApi.Features.Chat.RemoveParticipant;
using ChatSampleApi.Features.Chat.SendMessage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatSampleApi.Controllers
{
    [Authorize]
    [Route("api/chats")]
    public class ChatController : BaseController
    {
        [HttpGet("mine")]
        public async Task<ActionResult<List<object>>> GetChats()
        {
            var response = await Mediator.Send(new GetMyChatsList.Query { UserId = CurrentUserService.UserId });
            return Ok(response);
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

        [HttpGet("{chatId}/participants/new")]
        public async Task<ActionResult<IEnumerable<GetNewParticipantsSelector.UserDto>>> GetNewParticipantsSelector(string chatId, [FromQuery] GetNewParticipantsSelector.Query request)
        {
            request.ChatId = chatId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }
    }
}

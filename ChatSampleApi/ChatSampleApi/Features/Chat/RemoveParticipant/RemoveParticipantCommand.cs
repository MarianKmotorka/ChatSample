﻿using MediatR;

namespace ChatSampleApi.Features.Chat.RemoveParticipant
{
    public class RemoveParticipantCommand : IRequest
    {
        public string ChatId { get; set; }

        public string ParticipantId { get; set; }
    }
}

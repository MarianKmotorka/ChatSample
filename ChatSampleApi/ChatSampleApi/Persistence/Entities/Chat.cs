using System;
using System.Collections.Generic;
using System.Linq;
using ChatSampleApi.Exceptions;
using ChatSampleApi.Persistence.Entities.JunctionEntities;

namespace ChatSampleApi.Persistence.Entities
{
    public class Chat
    {
        public Chat(string name)
        {
            Name = name;
            Participants = new List<ChatUser>();
            Messages = new List<Message>();
        }

        private Chat()
        {
        }

        public string Id { get; }

        public string Name { get; private set; }

        public List<ChatUser> Participants { get; private set; }

        public List<Message> Messages { get; private set; }

        public Message AddMessage(AuthUser sender, string text)
        {
            if (!Participants.Any(x => x.UserId == sender.Id))
                throw new Forbidden403Exception();

            var message = new Message
            {
                Sender = sender,
                SentDate = DateTime.Now,
                Text = text
            };

            Messages.Add(message);

            foreach (var chatUser in Participants.Where(x => x.UserId != sender.Id))
                chatUser.UnreadMessages.Add(message);

            return message;
        }

        public void SetMessagesAsReadForParticipant(string id)
        {
            Participants.Single(x => x.UserId == id).UnreadMessages.Clear();
        }

        public AuthUser AddParticipant(AuthUser participant)
        {
            Participants.Add(new ChatUser { User = participant });
            return participant;
        }
    }
}

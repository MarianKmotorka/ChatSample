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
            _participants = new List<ChatUser>();
            _messages = new List<Message>();
        }

        private Chat()
        {
        }

        public string Id { get; }

        public string Name { get; private set; }

        public IReadOnlyCollection<ChatUser> Participants => _participants;
        private List<ChatUser> _participants;

        public IReadOnlyCollection<Message> Messages => _messages;
        private List<Message> _messages;

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

            _messages.Add(message);

            foreach (var chatUser in Participants.Where(x => x.UserId != sender.Id))
                chatUser.User.AddUnreadMessage(message);

            return message;
        }

        public AuthUser AddParticipant(AuthUser participant)
        {
            _participants.Add(new ChatUser(participant, this));
            return participant;
        }

        public AuthUser AddAdmin(AuthUser user)
        {
            var participant = Participants.SingleOrDefault(x => x.UserId == user.Id);

            if (participant is object)
                participant.MakeUserAdmin();
            else
                _participants.Add(new ChatUser(user, this, ChatRole.Admin));

            return user;
        }

        public void RemoveParticipant(ChatUser chatUser) => _participants.Remove(chatUser);
    }
}

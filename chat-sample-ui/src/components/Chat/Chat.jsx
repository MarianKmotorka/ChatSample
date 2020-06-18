import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  MessageWrapper,
  ImageAndName
} from './Chat.styled'

const Message = ({ message }) => (
  <MessageWrapper toRight={message.isMyMessage}>
    <ImageAndName>
      <img src={message.senderPicture} alt='' />
      <p>{message.senderName}</p>
    </ImageAndName>
    <h6>{message.text}</h6>
  </MessageWrapper>
)

const Chat = ({ messages, onMessageSent }) => {
  return (
    <Wrapper>
      <MessagesWrapper>
        {map(messages, x => (
          <Message message={x} />
        ))}
      </MessagesWrapper>
      <InputWrapper>
        <input /> <button>SEnd</button>
      </InputWrapper>
    </Wrapper>
  )
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      senderName: PropTypes.string.isRequired,
      isMyMessage: PropTypes.bool.isRequired,
      senderPicture: PropTypes.string.isRequired
    })
  ),
  onMessageSent: PropTypes.func.isRequired
}

export default Chat

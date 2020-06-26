import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { map, last } from 'lodash'
import {
  ChatWithInput,
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  MessageWrapper,
  MessageInfo,
  MessageDate,
  Text
} from './Chat.styled'
import ChatDetail from './ChatDetail/ChatDetail'

const Message = ({ message, forwardRef }) => (
  <MessageWrapper isMyMessage={message.isMyMessage}>
    <MessageInfo>
      <img src={message.senderPicture} alt='user' />
      <p>{message.senderName}</p>
      <MessageDate>{moment(message.date).fromNow()}</MessageDate>
    </MessageInfo>
    <Text ref={forwardRef}>{message.text}</Text>
  </MessageWrapper>
)

const Chat = ({ messages, participants, onMessageSent, chatId }) => {
  const [text, setText] = useState('')
  const lastMessageRef = useRef(null)

  useEffect(() => {
    lastMessageRef &&
      lastMessageRef.current &&
      lastMessageRef.current.scrollIntoView()
  }, [messages])

  const onMessageSentInternal = e => {
    e.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = message => {
    const isLast = message.id === last(messages).id

    return isLast ? (
      <Message key={message.id} message={message} forwardRef={lastMessageRef} />
    ) : (
      <Message key={message.id} message={message} />
    )
  }

  return (
    <Wrapper>
      <ChatWithInput>
        <MessagesWrapper>{map(messages, renderMessage)}</MessagesWrapper>
        <form onSubmit={onMessageSentInternal}>
          <InputWrapper>
            <input
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
            <button>
              <p>Send</p>
              <i className='fas fa-chevron-right'></i>
            </button>
          </InputWrapper>
        </form>
      </ChatWithInput>
      <ChatDetail participants={participants} chatId={chatId} />
    </Wrapper>
  )
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      senderName: PropTypes.string.isRequired,
      isMyMessage: PropTypes.bool.isRequired,
      senderPicture: PropTypes.string.isRequired
    })
  ).isRequired,
  onMessageSent: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    })
  ).isRequired,
  chatId: PropTypes.string.isRequired
}

export default Chat

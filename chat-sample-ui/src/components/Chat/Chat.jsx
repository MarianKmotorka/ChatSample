import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { map, last } from 'lodash'
import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  MessageWrapper,
  ImageAndName
} from './Chat.styled'

const Message = ({ message, forwardRef }) => (
  <MessageWrapper isMyMessage={message.isMyMessage}>
    <ImageAndName>
      <img src={message.senderPicture} alt='user' />
      <p>{message.senderName}</p>
    </ImageAndName>
    <h6 ref={forwardRef}>{message.text}</h6>
  </MessageWrapper>
)

const Chat = ({ messages, onMessageSent }) => {
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

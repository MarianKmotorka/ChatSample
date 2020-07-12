import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { map, last, get } from 'lodash'
import { SwapRightOutlined } from '@ant-design/icons'

import ChatDetail from './ChatDetail/ChatDetail'
import {
  ChatWithInput,
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  MessageWrapper,
  MessageInfo,
  MessageDate,
  Text,
  StyledButton
} from './Chat.styled'

const Message = ({ message, forwardRef }) => (
  <MessageWrapper isMyMessage={message.isMyMessage}>
    <MessageInfo>
      <img referrerPolicy='no-referrer' src={message.senderPicture} alt='' />
      <p>{message.senderName}</p>
      <MessageDate>{moment(message.date).fromNow()}</MessageDate>
    </MessageInfo>
    <Text className='wordwrap' ref={forwardRef}>
      {message.text}
    </Text>
  </MessageWrapper>
)

const Chat = ({ messages, participants, onMessageSent, chatId }) => {
  const [text, setText] = useState('')
  const lastMessageRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const input = get(inputRef, 'current')
    input && input.focus()
  }, [])

  useEffect(() => {
    const lastMessage = get(lastMessageRef, 'current')
    lastMessage && lastMessage.scrollIntoView()
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
              ref={inputRef}
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
            <StyledButton
              type='primary'
              shape='round'
              icon={<SwapRightOutlined />}
              onClick={onMessageSentInternal}
            >
              Send
            </StyledButton>
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

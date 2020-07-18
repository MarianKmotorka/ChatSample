import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { map, get } from 'lodash'
import { SwapRightOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'

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
  StyledButton,
  LoadMoreButton
} from './Chat.styled'

const Message = ({ message, forwardRef }) => (
  <MessageWrapper isMyMessage={message.isMyMessage} ref={forwardRef}>
    <MessageInfo>
      <img referrerPolicy='no-referrer' src={message.senderPicture} alt='' />
      <p>{message.senderName}</p>
      <MessageDate>{moment(message.date).fromNow()}</MessageDate>
    </MessageInfo>
    <Text className='wordwrap'>{message.text}</Text>
  </MessageWrapper>
)

const Chat = ({
  messages,
  participants,
  onMessageSent,
  chatId,
  onLoadMore,
  scrollToMessageId,
  showLoadMore = true
}) => {
  const [text, setText] = useState('')
  const scrollToMessageRef = useRef()
  const inputRef = useRef(null)

  useEffect(() => {
    const input = get(inputRef, 'current')
    input && input.focus()
  }, [])

  useEffect(() => {
    const message = get(scrollToMessageRef, 'current')
    message && message.scrollIntoView()
  }, [messages])

  const onMessageSentInternal = e => {
    e.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = message => {
    const commonProps = { key: message.id, message }

    if (scrollToMessageId === message.id)
      return <Message {...commonProps} forwardRef={scrollToMessageRef} />
    return <Message {...commonProps} />
  }

  return (
    <Wrapper>
      <ChatWithInput>
        <MessagesWrapper>
          {showLoadMore && (
            <LoadMoreButton onClick={onLoadMore} icon={<VerticalAlignTopOutlined />} />
          )}
          {map(messages, renderMessage)}
        </MessagesWrapper>
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
  chatId: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  scrollToMessageId: PropTypes.string,
  showLoadMore: PropTypes.bool
}

export default Chat

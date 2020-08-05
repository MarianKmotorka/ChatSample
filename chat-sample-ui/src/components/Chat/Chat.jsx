import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { SwapRightOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'

import Message from './Message'
import { getMessageShape } from './utils'
import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton,
  LoadMoreButton
} from './styled/Chat.styled'

const Chat = ({
  messages,
  onMessageSent,
  onLoadMore,
  scrollToMessageId,
  onDeleteMessage,
  onRecoverMessage,
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
    const commonProps = {
      key: message.id,
      message,
      shape: getMessageShape(messages, message),
      onDelete: onDeleteMessage,
      onRecover: onRecoverMessage
    }

    if (scrollToMessageId === message.id)
      return <Message {...commonProps} forwardRef={scrollToMessageRef} />
    return <Message {...commonProps} />
  }

  return (
    <Wrapper>
      <MessagesWrapper spaceFromTop={!showLoadMore && 10}>
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
  onLoadMore: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  onRecoverMessage: PropTypes.func.isRequired,
  scrollToMessageId: PropTypes.string,
  showLoadMore: PropTypes.bool
}

export default Chat

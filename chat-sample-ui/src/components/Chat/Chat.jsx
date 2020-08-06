import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
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
import { useFocusWhenMounted, useScrollTo } from './hooks'

const Chat = ({
  messages,
  onMessageSent,
  onLoadMore,
  scrollToMessageId,
  onDeleteMessage,
  onRecoverMessage,
  showLoadMore = true
}) => {
  const [text, setText] = useState()
  const scrollToMessageRef = useRef()
  const messagesWrapperRef = useRef()
  const inputRef = useRef()
  useFocusWhenMounted(inputRef)
  useScrollTo(scrollToMessageRef, [messages])

  const onMessageSentInternal = e => {
    e.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = message => {
    const ref = scrollToMessageId === message.id ? scrollToMessageRef : null
    return (
      <Message
        key={message.id}
        message={message}
        forwardRef={ref}
        shape={getMessageShape(messages, message)}
        onDelete={onDeleteMessage}
        onRecover={onRecoverMessage}
      />
    )
  }

  return (
    <Wrapper>
      <MessagesWrapper spaceFromTop={!showLoadMore && 10} ref={messagesWrapperRef}>
        {showLoadMore && (
          <LoadMoreButton onClick={onLoadMore} icon={<VerticalAlignTopOutlined />} />
        )}
        {map(messages, renderMessage)}
      </MessagesWrapper>
      <form onSubmit={onMessageSentInternal}>
        <InputWrapper>
          <input
            ref={inputRef}
            value={text || ''}
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

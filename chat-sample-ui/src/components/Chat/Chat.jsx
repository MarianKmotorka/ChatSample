import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { map, first } from 'lodash'
import { SwapRightOutlined } from '@ant-design/icons'

import Message from './Message'
import { getMessageShape } from './utils'

import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton
} from './styled/Chat.styled'
import { useFocusWhenMounted, useScrollTo } from './hooks'

const Chat = ({
  messages,
  onMessageSent,
  onLoadMore,
  scrollToMessageId,
  onDeleteMessage,
  onRecoverMessage,
  canLoadMore
}) => {
  const [text, setText] = useState()
  const scrollToMessageRef = useRef()
  const inputRef = useRef()
  useFocusWhenMounted(inputRef)
  useScrollTo(scrollToMessageRef, [messages])

  const observer = useRef()
  const topMessageRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && canLoadMore) {
          onLoadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [onLoadMore, canLoadMore]
  )

  const onMessageSentInternal = e => {
    e.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = message => {
    const ref =
      scrollToMessageId === message.id
        ? scrollToMessageRef
        : first(messages) === message
        ? topMessageRef
        : null

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
      <MessagesWrapper>{map(messages, renderMessage)}</MessagesWrapper>
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

import React, { useState, useRef, useCallback, FormEvent } from 'react'
import { map, first } from 'lodash'

import Message, { Message as MessageType } from './Message'
import EmojiListButton from './EmojiListButton'
import MessagesLoadingSpinner from './MessagesLoadingSpinner'
import { getMessageShape } from './utils'

import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton
} from './styled/Chat.styled'
import { useFocusWhenMounted, useScrollTo } from './hooks'

interface Props {
  messages: MessageType[]
  scrollToMessageId: string
  canLoadMore: boolean
  moreMessagesFetching: boolean
  onLoadMore: () => void
  onMessageSent: (text: string) => void
  onDeleteMessage: (id: string) => void
  onRecoverMessage: (id: string) => void
}

const Chat: React.FC<Props> = ({
  messages,
  canLoadMore,
  scrollToMessageId,
  moreMessagesFetching,
  onLoadMore,
  onMessageSent,
  onDeleteMessage,
  onRecoverMessage
}) => {
  const [text, setText] = useState('')
  const scrollToMessageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useFocusWhenMounted(inputRef)
  useScrollTo(scrollToMessageRef, [messages])

  const observer = useRef<IntersectionObserver>()
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

  const onMessageSentInternal = (e: FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = (message: MessageType) => {
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
      <MessagesWrapper>
        {moreMessagesFetching && <MessagesLoadingSpinner />}
        {map(messages, renderMessage)}
      </MessagesWrapper>

      <form onSubmit={onMessageSentInternal}>
        <InputWrapper>
          <EmojiListButton
            onSelect={useCallback(emoji => setText(prev => prev + emoji), [])}
          />

          <input
            ref={inputRef}
            value={text}
            onChange={({ target }) => setText(target.value)}
          />

          <StyledButton
            type='text'
            shape='round'
            color='primary'
            icon={<i className='fas fa-paper-plane fa-5x' />}
            onClick={_ => onMessageSentInternal(null)}
          />
        </InputWrapper>
      </form>
    </Wrapper>
  )
}

export default Chat

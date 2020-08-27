import React, { useState, useCallback, FormEvent } from 'react'
import { map, first } from 'lodash'

import Message from './Message'
import EmojiListButton from './EmojiListButton'
import MessagesLoadingSpinner from './MessagesLoadingSpinner'
import { IMessageDto } from '../../apiContracts/chatContracts'
import { getMessageShape } from './utils'
import { useObserver } from '../../utils/useObserver'

import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton
} from './styled/Chat.styled'
import { useFocusWhenMounted, useScrollTo } from './hooks'

interface IProps {
  messages: IMessageDto[]
  scrollToMessageId?: string
  canLoadMore: boolean
  moreMessagesFetching: boolean
  onLoadMore: () => void
  onMessageSent: (text: string) => void
  onDeleteMessage: (id: string) => void
  onRecoverMessage: (id: string) => void
}

const Chat: React.FC<IProps> = ({
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
  const inputRef = useFocusWhenMounted<HTMLInputElement>()
  const scrollToMessageRef = useScrollTo<HTMLDivElement>(scrollToMessageId, messages)
  const observeMessage = useObserver<HTMLDivElement>(canLoadMore, onLoadMore)

  const onMessageSentInternal = (e: FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault()
    setText('')
    text && onMessageSent(text)
  }

  const renderMessage = (message: IMessageDto) => {
    const ref =
      scrollToMessageId === message.id
        ? scrollToMessageRef
        : first(messages) === message
        ? observeMessage
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

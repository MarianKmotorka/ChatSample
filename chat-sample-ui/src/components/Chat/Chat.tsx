import React, { useState, useCallback, useMemo, FormEvent } from 'react'
import { map, first } from 'lodash'
import moment from 'moment'

import Message, { MessageShape } from './Message'
import EmojiListButton from './EmojiListButton'
import MessagesLoadingSpinner from './MessagesLoadingSpinner'
import { IMessageDto } from '../../apiContracts/chatContracts'
import { getMessageShape } from './utils'
import { useObserver } from '../../utils/useObserver'

import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton,
  TimeStamp
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

  const renderMessage = useCallback(
    (message: IMessageDto) => {
      const ref =
        scrollToMessageId === message.id
          ? scrollToMessageRef
          : first(messages) === message
          ? observeMessage
          : null

      const date = moment(message.date).format('MMMM Do YYYY, H:mm')
      const shape = getMessageShape(messages, message)
      const isDelayed =
        shape === MessageShape.STANDALONE_DELAYED || shape === MessageShape.TOP_DELAYED

      return (
        <div key={message.id}>
          {isDelayed && (
            <TimeStamp>
              <span>{date}</span>
            </TimeStamp>
          )}
          <Message
            message={message}
            forwardRef={ref}
            shape={shape}
            onDelete={onDeleteMessage}
            onRecover={onRecoverMessage}
          />
        </div>
      )
    },
    [
      observeMessage,
      messages,
      onDeleteMessage,
      onRecoverMessage,
      scrollToMessageId,
      scrollToMessageRef
    ]
  )

  return (
    <Wrapper>
      <MessagesWrapper>
        {moreMessagesFetching && <MessagesLoadingSpinner />}
        {useMemo(() => map(messages, renderMessage), [messages, renderMessage])}
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

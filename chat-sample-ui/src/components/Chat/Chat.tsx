import React, { useState, useCallback, useMemo, FormEvent } from 'react'
import { first, trim } from 'lodash'
import moment from 'moment'

import { getMessageShape } from './utils'
import EmojiListButton from './EmojiListButton'
import Message, { MessageShape } from './Message/Message'
import MessagesLoadingSpinner from './MessagesLoadingSpinner'
import TypingIndicator from './TypingIndicator/TypingIndicator'
import { IMessageDto, IParticipantDto } from '../../apiContracts/chatContracts'
import { useFocusElement, useScrollTo, useIsTyping, useObserver } from '../../utils'

import {
  Wrapper,
  MessagesWrapper,
  InputWrapper,
  StyledButton,
  TimeStamp
} from './Chat.styled'
import LoadingSpinner from '../LoadingSpinner'

interface IProps {
  messages: IMessageDto[]
  typingParticipants: IParticipantDto[]
  canLoadMore: boolean
  moreMessagesFetching: boolean
  isLoading: boolean
  scrollToMessageId?: string
  onLoadMore: () => void
  onMessageSent: (text: string) => void
  onDeleteMessage: (id: string) => void
  onRecoverMessage: (id: string) => void
  onIsTypingChanged: (isTyping: boolean) => void
}

const Chat: React.FC<IProps> = ({
  messages,
  isLoading,
  canLoadMore,
  scrollToMessageId,
  typingParticipants,
  moreMessagesFetching,
  onLoadMore,
  onMessageSent,
  onDeleteMessage,
  onRecoverMessage,
  onIsTypingChanged
}) => {
  const [text, setText] = useState('')
  const inputRef = useFocusElement<HTMLInputElement>()
  const scrollToMessageRef = useScrollTo<HTMLDivElement>(scrollToMessageId, messages)
  const observeMessage = useObserver<HTMLDivElement>(canLoadMore, onLoadMore)
  useIsTyping(text, onIsTypingChanged)

  const onMessageSentInternal = (e: FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault()
    setText('')
    trim(text) && onMessageSent(text)
  }

  const renderMessage = useCallback(
    (message: IMessageDto) => {
      const ref =
        scrollToMessageId === message.id
          ? scrollToMessageRef
          : first(messages) === message
          ? observeMessage
          : null

      const shape = getMessageShape(messages, message)
      const isDelayed =
        shape === MessageShape.STANDALONE_DELAYED || shape === MessageShape.TOP_DELAYED

      return (
        <div key={message.id}>
          {isDelayed && (
            <TimeStamp>
              <span>{moment(message.date).format('MMMM Do YYYY, H:mm')}</span>
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
      messages,
      scrollToMessageId,
      scrollToMessageRef,
      observeMessage,
      onDeleteMessage,
      onRecoverMessage
    ]
  )

  return (
    <Wrapper>
      <MessagesWrapper>
        {isLoading && <LoadingSpinner />}
        {moreMessagesFetching && <MessagesLoadingSpinner />}

        {useMemo(() => !isLoading && messages.map(renderMessage), [
          messages,
          isLoading,
          renderMessage
        ])}

        <TypingIndicator typingParticipants={typingParticipants} />
      </MessagesWrapper>

      <form onSubmit={onMessageSentInternal}>
        <InputWrapper>
          <EmojiListButton
            onSelect={useCallback(emoji => setText(prev => prev + emoji), [])}
          />

          <input
            disabled={isLoading}
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <StyledButton
            shape='circle'
            margin='0 15px'
            color='primary'
            bg='transparent'
            icon={<i className='fas fa-paper-plane' />}
            onClick={_ => onMessageSentInternal(null)}
            disabled={isLoading}
          />
        </InputWrapper>
      </form>
    </Wrapper>
  )
}

export default Chat

import React, { useContext, useEffect, useState } from 'react'
import { get, last, first } from 'lodash'
import { useParams } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import ChatDetail from './ChatDetail/ChatDetail'

import { ChatContext } from '../../contextProviders/ChatContextProvider'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/httpService'

import { Wrapper, InnerWrapper, TopBar } from './styled/ChatPage.styled'

const ChatPage = () => {
  const {
    currentChatFetching,
    getParticipants,
    getMessages,
    getMoreMessages,
    messages,
    participants,
    messageCountPerPage
  } = useContext(ChatContext)
  const { chatId } = useParams()
  const [scrollToMessageId, setScrollToMessageId] = useState()
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)

  useEffect(() => {
    getParticipants(chatId)
    getMessages(chatId)
    setShouldScrollToBottom(true)
  }, [chatId, getMessages, getParticipants])

  useEffect(() => {
    if (!shouldScrollToBottom) return

    var lastMessage = get(last(messages), 'id')
    lastMessage && setScrollToMessageId(lastMessage)
  }, [messages, shouldScrollToBottom])

  const handleMessageSent = async text => {
    setShouldScrollToBottom(true)
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  const handleLoadMore = async () => {
    setScrollToMessageId(get(first(messages), 'id'))
    setShouldScrollToBottom(false)

    await getMoreMessages(chatId)
  }

  if (currentChatFetching) return <LoadingSpinner />

  return (
    <Wrapper>
      <TopBar />
      <InnerWrapper>
        <Chat
          messages={messages}
          onLoadMore={handleLoadMore}
          onMessageSent={handleMessageSent}
          scrollToMessageId={scrollToMessageId}
          showLoadMore={messages.length >= messageCountPerPage}
        />
        <ChatDetail participants={participants} chatId={chatId} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default ChatPage

import React, { useContext, useEffect, useState } from 'react'
import { get, last, first } from 'lodash'
import { useParams } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'

import { ChatContext } from '../../contextProviders/ChatContextProvider'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/httpService'

const ChatPage = () => {
  const {
    currentChatFetching,
    getParticipants,
    getMessages,
    getMoreMessages,
    messages,
    participants
  } = useContext(ChatContext)
  const { chatId } = useParams()
  const [scrollToMessageId, setScrollToMessageId] = useState()
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)

  useEffect(() => {
    getParticipants(chatId)
    getMessages(chatId)
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
    <Chat
      chatId={chatId}
      messages={messages}
      participants={participants}
      onLoadMore={handleLoadMore}
      onMessageSent={handleMessageSent}
      scrollToMessageId={scrollToMessageId}
    />
  )
}

export default ChatPage

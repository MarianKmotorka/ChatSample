import React, { useContext, useEffect } from 'react'
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
    messages,
    participants
  } = useContext(ChatContext)
  const { chatId } = useParams()

  useEffect(() => {
    getParticipants(chatId)
    getMessages(chatId)
  }, [chatId, getMessages, getParticipants])

  const handleMessageSent = async text => {
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  if (currentChatFetching) return <LoadingSpinner />

  return (
    <Chat
      chatId={chatId}
      messages={messages}
      participants={participants}
      onMessageSent={handleMessageSent}
    />
  )
}

export default ChatPage

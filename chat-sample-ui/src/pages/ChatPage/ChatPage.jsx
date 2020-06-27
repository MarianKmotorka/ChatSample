import React, { useContext, useEffect } from 'react'
import { get } from 'lodash'
import { useParams } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/httpService'

const ChatPage = () => {
  const { currentChat, currentChatFetching, getChat } = useContext(ChatContext)
  const { chatId } = useParams()

  useEffect(() => {
    getChat(chatId)
  }, [chatId, getChat])

  const handleMessageSent = async text => {
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  if (currentChatFetching) return <LoadingSpinner />

  return (
    <Chat
      chatId={chatId}
      messages={get(currentChat, 'messages', [])}
      participants={get(currentChat, 'participants', [])}
      onMessageSent={handleMessageSent}
    />
  )
}

export default ChatPage

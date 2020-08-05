import React, { useContext, useEffect, useState } from 'react'
import { get, last, first } from 'lodash'
import { useParams, useHistory } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import ChatDetail from '../../components/Chat/Detail/ChatDetail'

import { ChatContext } from '../../contextProviders/ChatContextProvider'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/httpService'

import { Wrapper } from './styled/ChatPage.styled'

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
  const history = useHistory()

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

  if (currentChatFetching) return <LoadingSpinner />

  const handleMessageSent = async text => {
    setShouldScrollToBottom(true)
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  const handleLoadMore = async () => {
    setScrollToMessageId(get(first(messages), 'id'))
    setShouldScrollToBottom(false)
    await getMoreMessages(chatId)
  }

  const handleMessageDeleted = async id => {
    setScrollToMessageId(null)
    setShouldScrollToBottom(false)
    await api.delete(`/chats/${chatId}/messages/${id}`)
  }

  const handleMessageRecovered = async id => {
    setScrollToMessageId(null)
    setShouldScrollToBottom(false)
    await api.put(`/chats/${chatId}/messages/${id}/recover`)
  }

  const handleAddParticipant = async user => {
    await api.post(`/chats/${chatId}/participants`, {
      participantId: get(user, 'id')
    })
  }

  const handleChatDeleted = async () => {
    await api.delete(`/chats/${chatId}`)
    history.goBack()
  }

  const handleParticipantDeleted = async id => {
    await api.delete(`/chats/${chatId}/participants/${id}`)
  }

  const handleSetParticipantAsAdmin = async id => {
    await api.put(`/chats/${chatId}/participants/${id}/set-admin-role`)
  }

  return (
    <Wrapper>
      <Chat
        messages={messages}
        onLoadMore={handleLoadMore}
        onMessageSent={handleMessageSent}
        scrollToMessageId={scrollToMessageId}
        showLoadMore={messages.length >= messageCountPerPage}
        onDeleteMessage={handleMessageDeleted}
        onRecoverMessage={handleMessageRecovered}
      />
      <ChatDetail
        participants={participants}
        chatId={chatId}
        onAddParticipant={handleAddParticipant}
        onDeleteParticipant={handleParticipantDeleted}
        onSetParticipantAsAdmin={handleSetParticipantAsAdmin}
        onDeleteChat={handleChatDeleted}
      />
    </Wrapper>
  )
}

export default ChatPage

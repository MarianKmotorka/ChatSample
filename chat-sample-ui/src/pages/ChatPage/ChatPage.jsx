import React, { useContext, useEffect, useState, useCallback } from 'react'
import { get, last, first } from 'lodash'
import { useParams, useHistory } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import ChatDetail from '../../components/Chat/Detail/ChatDetail'

import TopBar from './TopBar'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/httpService'

import { Wrapper, InnerWrapper } from './styled/ChatPage.styled'

const ChatPage = () => {
  const {
    currentChatFetching,
    moreMessagesFetching,
    getParticipants,
    getMessages,
    getMoreMessages,
    messages,
    participants,
    totalMessagesCount
  } = useContext(ChatContext)

  const { chatId } = useParams()
  const history = useHistory()

  const [scrollToMessageId, setScrollToMessageId] = useState()
  const lastMessageId = get(last(messages), 'id')
  const firstMessageId = get(first(messages), 'id')

  useEffect(() => setScrollToMessageId(lastMessageId), [lastMessageId])

  useEffect(() => {
    getParticipants(chatId)
    getMessages(chatId)
  }, [chatId, getMessages, getParticipants])

  const handleMessageSent = async text => {
    setScrollToMessageId(lastMessageId)
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  const handleLoadMore = async () => {
    setScrollToMessageId(firstMessageId)
    await getMoreMessages(chatId)
  }

  const handleMessageDeleted = useCallback(
    async id => {
      setScrollToMessageId(null)
      await api.delete(`/chats/${chatId}/messages/${id}`)
    },
    [chatId]
  )

  const handleMessageRecovered = useCallback(
    async id => {
      setScrollToMessageId(null)
      await api.put(`/chats/${chatId}/messages/${id}/recover`)
    },
    [chatId]
  )

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
          onDeleteMessage={handleMessageDeleted}
          onRecoverMessage={handleMessageRecovered}
          canLoadMore={totalMessagesCount > messages.length}
          moreMessagesFetching={moreMessagesFetching}
        />
        <ChatDetail
          participants={participants}
          chatId={chatId}
          onAddParticipant={handleAddParticipant}
          onDeleteParticipant={handleParticipantDeleted}
          onSetParticipantAsAdmin={handleSetParticipantAsAdmin}
          onDeleteChat={handleChatDeleted}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default ChatPage

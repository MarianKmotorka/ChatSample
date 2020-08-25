import React, { useContext, useEffect, useState, useCallback } from 'react'
import { get, last, first } from 'lodash'
import { useParams, useHistory } from 'react-router-dom'

import TopBar from './TopBar'
import Chat from '../../components/Chat/Chat'
import LoadingSpinner from '../../components/LoadingSpinner'
import ChatDetail from '../../components/Chat/Detail/ChatDetail'
import { ChatContext } from '../../contextProviders'
import { IParticipantDto } from '../../apiContracts/chatContracts'
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
  const [scrollToMessageId, setScrollToMessageId] = useState<string>()
  const [showChatDetail, setShowChatDetail] = useState(false)

  const lastMessageId = last(messages)?.id
  const firstMessageId = first(messages)?.id

  useEffect(() => setScrollToMessageId(lastMessageId), [lastMessageId])

  useEffect(() => {
    getParticipants(chatId)
    getMessages(chatId)
  }, [chatId, getMessages, getParticipants])

  const handleMessageSent = async (text: string) => {
    setScrollToMessageId(lastMessageId)
    await api.post(`/chats/${chatId}/messages`, { text })
  }

  const handleLoadMore = async () => {
    setScrollToMessageId(firstMessageId)
    await getMoreMessages(chatId)
  }

  const handleMessageDeleted = useCallback(
    async id => {
      setScrollToMessageId(undefined)
      await api.delete(`/chats/${chatId}/messages/${id}`)
    },
    [chatId]
  )

  const handleMessageRecovered = useCallback(
    async id => {
      setScrollToMessageId(undefined)
      await api.put(`/chats/${chatId}/messages/${id}/recover`)
    },
    [chatId]
  )

  const handleAddParticipant = async (user: IParticipantDto) =>
    await api.post(`/chats/${chatId}/participants`, {
      participantId: get(user, 'id')
    })

  const handleChatDeleted = async () => {
    await api.delete(`/chats/${chatId}`)
    history.goBack()
  }

  const handleParticipantDeleted = async (id: string) =>
    await api.delete(`/chats/${chatId}/participants/${id}`)

  const handleSetParticipantAsAdmin = async (id: string) =>
    await api.put(`/chats/${chatId}/participants/${id}/set-admin-role`)

  const handleChatRenamed = async (name: string) =>
    await api.patch(`/chats/${chatId}`, { name })

  if (currentChatFetching) return <LoadingSpinner />

  return (
    <Wrapper>
      <TopBar
        onDeleteChat={handleChatDeleted}
        onRenameChat={handleChatRenamed}
        onToggleChatDetail={() => setShowChatDetail(prev => !prev)}
      />
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
        {showChatDetail && (
          <ChatDetail
            participants={participants}
            chatId={chatId}
            onAddParticipant={handleAddParticipant}
            onDeleteParticipant={handleParticipantDeleted}
            onSetParticipantAsAdmin={handleSetParticipantAsAdmin}
          />
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

export default ChatPage
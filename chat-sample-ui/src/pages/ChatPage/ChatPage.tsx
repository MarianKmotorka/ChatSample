import React, { useContext, useEffect, useState, useCallback } from 'react'
import { get, last, first } from 'lodash'
import { useParams, useHistory } from 'react-router-dom'

import TopBar from './TopBar'
import api from '../../services/httpService'
import Chat from '../../components/Chat/Chat'
import { ChatContext } from '../../contextProviders'
import ChatDetail from '../../components/Chat/Detail/ChatDetail'
import { IParticipantDto } from '../../apiContracts/chatContracts'

import { Wrapper, InnerWrapper } from './styled/ChatPage.styled'

const ChatPage = () => {
  const {
    currentChatFetching,
    moreMessagesFetching,
    messages,
    participants,
    hubConnection,
    hubDisconnected,
    hasMoreMessages,
    typingParticipants,
    setCurrentChatId,
    getMoreMessages
  } = useContext(ChatContext)

  const { chatId } = useParams()
  const history = useHistory()
  const [scrollToMessageId, setScrollToMessageId] = useState<string>()
  const [showChatDetail, setShowChatDetail] = useState(false)

  const lastMessageId = last(messages)?.id
  const firstMessageId = first(messages)?.id

  useEffect(() => setCurrentChatId(chatId), [chatId, setCurrentChatId])
  useEffect(() => setScrollToMessageId(lastMessageId), [lastMessageId])

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

  const handleIsTypingChanged = useCallback(
    (isTyping: boolean) => {
      if (hubDisconnected === undefined)
        hubConnection?.invoke('SendIsTyping', isTyping, chatId)
    },
    [hubConnection, chatId, hubDisconnected]
  )

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
          canLoadMore={hasMoreMessages}
          scrollToMessageId={scrollToMessageId}
          moreMessagesFetching={moreMessagesFetching}
          typingParticipants={typingParticipants}
          onIsTypingChanged={handleIsTypingChanged}
          onLoadMore={handleLoadMore}
          onMessageSent={handleMessageSent}
          onDeleteMessage={handleMessageDeleted}
          onRecoverMessage={handleMessageRecovered}
          isLoading={currentChatFetching}
        />

        {showChatDetail && (
          <ChatDetail
            participants={participants}
            chatId={chatId}
            onAddParticipant={handleAddParticipant}
            onDeleteParticipant={handleParticipantDeleted}
            onSetParticipantAsAdmin={handleSetParticipantAsAdmin}
            isLoading={currentChatFetching}
          />
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

export default ChatPage

import React, { useState, useEffect, createContext, useCallback, useContext } from 'react'
import { get, filter, map, find } from 'lodash'
import useSound from 'use-sound'
import { useHistory } from 'react-router-dom'

import useHub from '../utils/useHub'
import api from '../services/httpService'
import { API_URL } from '../utils/config.json'
import { isLoggedIn } from '../services/authService'
import { ProfileContext } from './'
import newMessageBeep from '../sounds/newMessageBeep.mp3'

const FETCH_MESSAGES_PAGE_SIZE = 50
export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState(null)
  const [chatsFetching, setChatsFetching] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [messagesFetching, setMessagesFetching] = useState(false)
  const [moreMessagesFetching, setMoreMessagesFetching] = useState(false)
  const [participantsFetching, setParticipantsFetching] = useState(false)
  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])
  const [totalMessagesCount, setTotalMessagesCount] = useState(0)

  const { hubConnection } = useHub(`${API_URL}/chat-hub`)
  const { profile } = useContext(ProfileContext)
  const [beep] = useSound(newMessageBeep)
  const history = useHistory()

  const recieveMessage = useCallback(
    (chatId, message) => {
      setChats(prev => {
        var chat = find(prev, ['id', chatId])
        var otherChats = filter(prev, x => x.id !== chatId)
        return [chat, ...otherChats]
      })

      if (chatId !== currentChatId) {
        setChats(prev =>
          map(prev, x =>
            x.id === chatId ? { ...x, unreadMessages: x.unreadMessages + 1 } : x
          )
        )

        return beep()
      }

      const updatedMessage = {
        ...message,
        isMyMessage: get(message, 'senderId') === get(profile, 'id')
      }

      setMessages(prev => [...prev, updatedMessage])
      setTotalMessagesCount(prev => prev + 1)
    },
    [currentChatId, profile, beep]
  )

  const recieveParticipant = useCallback(
    (chat, participant) => {
      if (participant.id === profile.id) setChats([chat, ...chats])
      if (chat.id === currentChatId) setParticipants([...participants, participant])
    },
    [currentChatId, profile, chats, participants]
  )

  const recieveChat = useCallback(chat => {
    setChats(prev => [chat, ...prev])
  }, [])

  const deleteChat = useCallback(
    chatId => {
      if (chatId === currentChatId) history.replace('/')
      setChats(prev => filter(prev, x => x.id !== chatId))
    },
    [currentChatId, history]
  )

  const deleteMessage = useCallback(messageId => {
    setMessages(prev =>
      map(prev, m => (m.id === messageId ? { ...m, isDeleted: true, text: '' } : m))
    )
  }, [])

  const deleteParticipant = useCallback(
    (chatId, participantId) => {
      if (get(profile, 'id') === participantId) {
        history.replace('/')
        return setChats(prev => filter(prev, x => x.id !== chatId))
      }

      if (chatId !== currentChatId) return

      setParticipants(prev => filter(prev, x => x.id !== participantId))
    },
    [profile, currentChatId, history]
  )

  const getParticipants = useCallback(async chatId => {
    setParticipantsFetching(true)
    setCurrentChatId(chatId)

    const response = await api.get(`chats/${chatId}/participants`)
    setParticipants(get(response, 'data'))

    setParticipantsFetching(false)
  }, [])

  const getMessages = useCallback(async chatId => {
    setMessagesFetching(true)
    setCurrentChatId(chatId)

    const response = await api.get(
      `chats/${chatId}/messages?count=${FETCH_MESSAGES_PAGE_SIZE}`
    )
    setMessages(get(response, 'data.data'))

    setChats(prev => map(prev, x => (x.id === chatId ? { ...x, unreadMessages: 0 } : x)))

    setTotalMessagesCount(get(response, 'data.totalCount'))
    setMessagesFetching(false)
  }, [])

  const getMoreMessages = useCallback(
    async chatId => {
      setMoreMessagesFetching(true)
      const response = await api.get(
        `chats/${chatId}/messages?skip=${messages.length}&count=${FETCH_MESSAGES_PAGE_SIZE}`
      )

      const moreMessages = get(response, 'data.data')
      setMessages(prev => [...moreMessages, ...prev])
      setTotalMessagesCount(get(response, 'data.totalCount'))
      setMoreMessagesFetching(false)
    },
    [messages.length]
  )

  const userConnectedStatusChanged = useCallback((userId, isOnline) => {
    setParticipants(prev => map(prev, x => (x.id === userId ? { ...x, isOnline } : x)))
  }, [])

  const onParticipantRoleChanged = useCallback(
    (chatId, participantId, chatRole) => {
      if (chatId !== currentChatId) return

      setParticipants(prev =>
        map(prev, x => (x.id === participantId ? { ...x, chatRole } : x))
      )

      setChats(prev => map(prev, x => (x.id === chatId ? { ...x, chatRole } : x)))
    },
    [currentChatId]
  )

  const recoverMessage = useCallback((messageId, text) => {
    setMessages(prev =>
      map(prev, m => (m.id === messageId ? { ...m, isDeleted: false, text } : m))
    )
  }, [])

  const renameChat = useCallback((chatId, name) => {
    setChats(prev => map(prev, x => (x.id === chatId ? { ...x, name } : x)))
  }, [])

  useEffect(() => {
    const fetchChats = async () => {
      setChatsFetching(true)
      const response = await api.get('/chats/mine')
      setChats(response.data)
      setChatsFetching(false)
    }

    if (isLoggedIn) {
      fetchChats()
    }
  }, [])

  useEffect(() => {
    if (!hubConnection) return

    hubConnection.on('RecieveChat', recieveChat)
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', deleteChat)
    hubConnection.on('DeleteMessage', deleteMessage)
    hubConnection.on('DeleteParticipant', deleteParticipant)
    hubConnection.on('UserConnectedStatusChanged', userConnectedStatusChanged)
    hubConnection.on('ParticipantRoleChanged', onParticipantRoleChanged)
    hubConnection.on('RecoverMessage', recoverMessage)
    hubConnection.on('RenameChat', renameChat)

    return () => {
      hubConnection.off('RecieveChat')
      hubConnection.off('RecieveMessage')
      hubConnection.off('RecieveParticipant')
      hubConnection.off('DeleteChat')
      hubConnection.off('DeleteMessage')
      hubConnection.off('DeleteParticipant')
      hubConnection.off('UserConnectedStatusChanged')
      hubConnection.off('ParticipantRoleChanged')
      hubConnection.off('RecoverMessage')
      hubConnection.off('RenameChat')
    }
  }, [
    hubConnection,
    recieveMessage,
    recieveParticipant,
    recieveChat,
    deleteChat,
    deleteMessage,
    deleteParticipant,
    userConnectedStatusChanged,
    onParticipantRoleChanged,
    recoverMessage,
    renameChat
  ])

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatsFetching,
        currentChatFetching: messagesFetching || participantsFetching,
        moreMessagesFetching,
        currentChatId,
        messages,
        participants,
        totalMessagesCount,
        FETCH_MESSAGES_PAGE_SIZE,
        getMessages,
        getMoreMessages,
        getParticipants
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

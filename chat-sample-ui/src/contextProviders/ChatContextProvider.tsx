import React, { useState, useEffect, createContext, useCallback, useContext } from 'react'
import useSound from 'use-sound'
import { useHistory } from 'react-router-dom'
import { get, filter, map, find } from 'lodash'
import { HubConnection } from '@microsoft/signalr'

import useHub from '../utils/useHub'
import api from '../services/httpService'
import { API_URL } from '../utils/config.json'
import { isLoggedIn } from '../services/authService'
import { IChatDto, IMessageDto, IParticipantDto } from '../apiContracts/chatContracts'
import { ProfileContext } from './'

const newMessageBeep = require('../assets/sounds/newMessageBeep.mp3')

interface IValue {
  chats: IChatDto[]
  chatsFetching: boolean
  currentChatId: string
  currentChatFetching: boolean
  moreMessagesFetching: boolean
  messages: IMessageDto[]
  participants: IParticipantDto[]
  FETCH_MESSAGES_PAGE_SIZE: number
  hasMoreMessages: boolean
  hubConnection?: HubConnection
  getMoreMessages: (chatId: string) => Promise<void>
  setCurrentChatId: React.Dispatch<React.SetStateAction<string>>
}

const FETCH_MESSAGES_PAGE_SIZE = 25
export const ChatContext = createContext<IValue>(null!)

const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentChatId, setCurrentChatId] = useState('')
  const [chatsFetching, setChatsFetching] = useState(true)
  const [hasMoreMessages, setHasMoreMessages] = useState(false)
  const [currentChatFetching, setCurrentChatFetching] = useState(true)
  const [moreMessagesFetching, setMoreMessagesFetching] = useState(false)

  const [chats, setChats] = useState<IChatDto[]>([])
  const [messages, setMessages] = useState<IMessageDto[]>([])
  const [participants, setParticipants] = useState<IParticipantDto[]>([])
  const [typingParticipants, setTypingParticipants] = useState<IParticipantDto[]>([])

  const { hubConnection } = useHub(`${API_URL}/chat-hub`)
  const { profile } = useContext(ProfileContext)
  const [beep] = useSound(newMessageBeep)
  const history = useHistory()

  // Fetch CURRENT CHAT
  useEffect(() => {
    const fetch = async () => {
      setCurrentChatFetching(true)

      var responses = await Promise.all([
        api.get(`chats/${currentChatId}/participants`),
        api.get(`chats/${currentChatId}/messages?count=${FETCH_MESSAGES_PAGE_SIZE}`)
      ])

      setParticipants(responses[0]?.data)
      setMessages(responses[1]?.data.data)
      setHasMoreMessages(responses[1].data.hasMore)
      setChats(prev =>
        map(prev, x => (x.id === currentChatId ? { ...x, unreadMessages: 0 } : x))
      )
      setTypingParticipants([])
      setCurrentChatFetching(false)
    }

    currentChatId && fetch()
  }, [currentChatId])

  // FETCH ALL CHATS
  useEffect(() => {
    const fetch = async () => {
      setChatsFetching(true)
      setChats((await api.get('/chats/mine')).data)
      setChatsFetching(false)
    }

    isLoggedIn && fetch()
  }, [])

  const recieveMessage = useCallback(
    (chatId, message) => {
      setChats(prev => {
        var chat = find(prev, ['id', chatId])
        var otherChats = filter(prev, x => x.id !== chatId)
        return [chat!, ...otherChats]
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
        isMyMessage: get(message, 'senderId') === profile.id
      }

      setMessages(prev => [...prev, updatedMessage])
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
      if (profile.id === participantId) {
        history.replace('/')
        return setChats(prev => filter(prev, x => x.id !== chatId))
      }

      if (chatId !== currentChatId) return

      setParticipants(prev => filter(prev, x => x.id !== participantId))
    },
    [profile, currentChatId, history]
  )

  const getMoreMessages = useCallback(
    async chatId => {
      setMoreMessagesFetching(true)
      const response = await api.get(
        `chats/${chatId}/messages?skip=${messages.length}&count=${FETCH_MESSAGES_PAGE_SIZE}`
      )

      const moreMessages = response?.data.data || []
      setMessages(prev => [...moreMessages, ...prev])
      setHasMoreMessages(response?.data.hasMore)
      setMoreMessagesFetching(false)
    },
    [messages.length]
  )

  const changeUserStatus = useCallback((userId, isOnline) => {
    setParticipants(prev => map(prev, x => (x.id === userId ? { ...x, isOnline } : x)))
  }, [])

  const changeParticipantRole = useCallback(
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

  const setIsTyping = useCallback(
    (isTyping, userId, chatId) => {
      if (chatId !== currentChatId) return

      if (isTyping && typingParticipants.every(x => x.id !== userId))
        setTypingParticipants(prev => [...prev, find(participants, ['id', userId])!])
      else {
        setTypingParticipants(prev => prev.filter(x => x.id !== userId))
      }
    },
    [participants, currentChatId, typingParticipants]
  )

  useEffect(() => {
    if (!hubConnection) return

    hubConnection.on('RecieveChat', recieveChat)
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', deleteChat)
    hubConnection.on('DeleteMessage', deleteMessage)
    hubConnection.on('DeleteParticipant', deleteParticipant)
    hubConnection.on('ChangeUserStatus', changeUserStatus)
    hubConnection.on('ChangeParticipantRole', changeParticipantRole)
    hubConnection.on('RecoverMessage', recoverMessage)
    hubConnection.on('RenameChat', renameChat)
    hubConnection.on('SetIsTyping', setIsTyping)

    return () => {
      hubConnection.off('RecieveChat')
      hubConnection.off('RecieveMessage')
      hubConnection.off('RecieveParticipant')
      hubConnection.off('DeleteChat')
      hubConnection.off('DeleteMessage')
      hubConnection.off('DeleteParticipant')
      hubConnection.off('ChangeUserStatus')
      hubConnection.off('ChangeParticipantRole')
      hubConnection.off('RecoverMessage')
      hubConnection.off('RenameChat')
      hubConnection.off('SetIsTyping')
    }
  }, [
    hubConnection,
    recieveMessage,
    recieveParticipant,
    recieveChat,
    deleteChat,
    deleteMessage,
    deleteParticipant,
    changeUserStatus,
    changeParticipantRole,
    recoverMessage,
    renameChat,
    setIsTyping
  ])

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatsFetching,
        currentChatFetching,
        moreMessagesFetching,
        currentChatId,
        messages,
        participants,
        hasMoreMessages,
        FETCH_MESSAGES_PAGE_SIZE,
        hubConnection,
        getMoreMessages,
        setCurrentChatId
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

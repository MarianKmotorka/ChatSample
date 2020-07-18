import React, { useState, useEffect, createContext, useCallback, useContext } from 'react'
import { get, filter, map } from 'lodash'
import useSound from 'use-sound'
import { useHistory } from 'react-router-dom'

import useHub from '../utils/useHub'
import api from '../services/httpService'
import { isLoggedIn } from '../services/authService'
import { ProfileContext } from './ProfileContextProvider'
import newMessageBeep from '../sounds/newMessageBeep.mp3'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState(null)
  const [chatsFetching, setChatsFetching] = useState(false)

  const [currentChatId, setCurrentChatId] = useState(null)
  const [messagesFetching, setMessagesFetching] = useState(false)
  const [participantsFetching, setParticipantsFetching] = useState(false)

  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])

  const [connectionId, setConnectionId] = useState(null)

  const { hubConnection } = useHub('https://localhost:5001/api/chat-hub')
  const { profile } = useContext(ProfileContext)
  const [beep] = useSound(newMessageBeep)
  const history = useHistory()

  const recieveMessage = useCallback(
    (chatId, message) => {
      if (chatId !== currentChatId) {
        setChats(prev =>
          map(prev, x => {
            if (x.id === chatId) return { ...x, unreadMessages: x.unreadMessages + 1 }
            return x
          })
        )

        beep()
        return
      }

      const updatedMessage = {
        ...message,
        isMyMessage: get(message, 'senderId') === get(profile, 'id')
      }

      setMessages(prev => [...prev, updatedMessage])
    },
    [currentChatId, profile, beep]
  )

  const recieveParticipant = useCallback(
    (chat, participant) => {
      if (get(participant, 'id') === get(profile, 'id')) setChats([chat, ...chats])

      if (chat.id !== currentChatId) return

      setParticipants([...participants, participant])
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

    const response = await api.get(`chats/${chatId}/messages`)
    setMessages(get(response, 'data'))

    setChats(prev =>
      map(prev, x => {
        if (x.id === chatId) return { ...x, unreadMessages: 0 }
        return x
      })
    )

    setMessagesFetching(false)
  }, [])

  const getMoreMessages = useCallback(
    async chatId => {
      const skip = messages.length
      const response = await api.get(`chats/${chatId}/messages?skip=${skip}`)

      const moreMessages = get(response, 'data')
      setMessages(prev => [...moreMessages, ...prev])
    },
    [messages.length]
  )

  const userConnectedStatusChanged = useCallback((userId, isOnline) => {
    setParticipants(prev =>
      map(prev, x => {
        if (x.id === userId) return { ...x, isOnline }
        return x
      })
    )
  }, [])

  const onParticipantRoleChanged = useCallback(
    (chatId, participantId, chatRole) => {
      if (chatId !== currentChatId) return

      setParticipants(prev =>
        map(prev, x => {
          if (x.id === participantId) return { ...x, chatRole }
          return x
        })
      )

      setChats(prev =>
        map(prev, x => {
          if (x.id === chatId) return { ...x, chatRole }
          return x
        })
      )
    },
    [currentChatId]
  )

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
    hubConnection.on('GetConnectionId', setConnectionId)
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', deleteChat)
    hubConnection.on('DeleteParticipant', deleteParticipant)
    hubConnection.on('UserConnectedStatusChanged', userConnectedStatusChanged)
    hubConnection.on('ParticipantRoleChanged', onParticipantRoleChanged)

    return () => {
      hubConnection.off('RecieveChat')
      hubConnection.off('GetConnectionId')
      hubConnection.off('RecieveMessage')
      hubConnection.off('RecieveParticipant')
      hubConnection.off('DeleteChat')
      hubConnection.off('DeleteParticipant')
      hubConnection.off('UserConnectedStatusChanged')
      hubConnection.off('ParticipantRoleChanged')
    }
  }, [
    hubConnection,
    recieveMessage,
    setConnectionId,
    recieveParticipant,
    recieveChat,
    deleteChat,
    deleteParticipant,
    userConnectedStatusChanged,
    onParticipantRoleChanged
  ])

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatsFetching,
        currentChatFetching: messagesFetching || participantsFetching,
        connectionId,
        currentChatId,
        messages,
        participants,
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

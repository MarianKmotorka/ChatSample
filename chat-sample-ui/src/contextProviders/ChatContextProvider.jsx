import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext
} from 'react'
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

  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatFetching, setCurrentChatFetching] = useState(false)

  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])

  const [connectionId, setConnectionId] = useState(null)

  const { hubConnection } = useHub('https://localhost:5001/api/chat-hub')
  const { profile } = useContext(ProfileContext)
  const [beep] = useSound(newMessageBeep)
  const history = useHistory()

  const recieveMessage = useCallback(
    (chatId, message) => {
      if (chatId !== get(currentChat, 'id')) {
        setChats(prev =>
          map(prev, x => {
            if (x.id === chatId)
              return { ...x, unreadMessages: x.unreadMessages + 1 }
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
    [currentChat, profile, beep]
  )

  const recieveParticipant = useCallback(
    (chat, participant) => {
      if (get(participant, 'id') === get(profile, 'id'))
        setChats([chat, ...chats])

      if (chat.id !== get(currentChat, 'id')) return

      setParticipants([...participants, participant])
    },
    [currentChat, profile, chats, participants]
  )

  const recieveChat = useCallback(chat => {
    setChats(prev => [chat, ...prev])
  }, [])

  const deleteChat = useCallback(
    chatId => {
      if (chatId === currentChat.id) history.replace('/')
      setChats(prev => filter(prev, x => x.id !== chatId))
    },
    [currentChat, history]
  )

  const deleteParticipant = useCallback(
    (chatId, participantId) => {
      if (get(profile, 'id') === participantId) {
        history.replace('/')
        return setChats(prev => filter(prev, x => x.id !== chatId))
      }

      if (chatId !== get(currentChat, 'id')) return

      setParticipants(prev => filter(prev, x => x.id !== participantId))
    },
    [profile, currentChat, history]
  )

  const getChat = useCallback(async chatId => {
    setCurrentChatFetching(true)
    const response = await api.get(`chats/mine/${chatId}`)
    setCurrentChatFetching(false)

    setCurrentChat(get(response, 'data'))
    setParticipants(get(response, 'data.participants'))
    setMessages(get(response, 'data.messages'))

    setChats(prev =>
      map(prev, x => {
        if (x.id === chatId) return { ...x, unreadMessages: 0 }
        return x
      })
    )
  }, [])

  const userConnectedStatusChanged = useCallback((userId, isOnline) => {
    setParticipants(prev =>
      map(prev, x => {
        if (x.id === userId) return { ...x, isOnline }
        return x
      })
    )
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
    hubConnection.on('GetConnectionId', setConnectionId)
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', deleteChat)
    hubConnection.on('DeleteParticipant', deleteParticipant)
    hubConnection.on('UserConnectedStatusChanged', userConnectedStatusChanged)

    return () => {
      hubConnection.off('RecieveChat')
      hubConnection.off('GetConnectionId')
      hubConnection.off('RecieveMessage')
      hubConnection.off('RecieveParticipant')
      hubConnection.off('DeleteChat')
      hubConnection.off('DeleteParticipant')
      hubConnection.off('UserConnectedStatusChanged')
    }
  }, [
    hubConnection,
    recieveMessage,
    setConnectionId,
    recieveParticipant,
    recieveChat,
    deleteChat,
    deleteParticipant,
    userConnectedStatusChanged
  ])

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatsFetching,
        connectionId,
        currentChat,
        currentChatFetching,
        messages,
        participants,
        getChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

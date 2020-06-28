import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext
} from 'react'
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from '@aspnet/signalr'
import { get, filter } from 'lodash'

import api from '../services/httpService'
import { isLoggedIn, getJwt } from '../services/authService'
import { ProfileContext } from './ProfileContextProvider'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState(null)
  const [chatsFetching, setChatsFetching] = useState(false)

  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatFetching, setCurrentChatFetching] = useState(false)

  const [messages, setMessages] = useState([])
  const [participants, setParticipants] = useState([])

  const [connectionId, setConnectionId] = useState(null)
  const [hubConnection, setHubConnection] = useState(null)

  const { profile } = useContext(ProfileContext)

  const recieveMessage = useCallback(
    (chatId, message) => {
      if (chatId !== get(currentChat, 'id')) return

      const updatedMessage = {
        ...message,
        isMyMessage: get(message, 'senderId') === get(profile, 'id')
      }

      setMessages(prev => [...prev, updatedMessage])
    },
    [currentChat, profile]
  )

  const recieveParticipant = useCallback(
    (chat, participant) => {
      if (get(participant, 'id') === get(profile, 'id'))
        setChats(x => [chat, ...x])

      if (chat.id !== get(currentChat, 'id')) return

      setParticipants(prev => [...prev, participant])
    },
    [currentChat, profile]
  )

  const recieveChat = useCallback(chat => {
    setChats(prev => [chat, ...prev])
  }, [])

  const deleteChat = useCallback(
    chatId => setChats(prev => filter(prev, x => x.id !== chatId)),
    []
  )

  const fetchChats = async () => {
    setChatsFetching(true)
    const { data } = await api.get('/chats/mine')
    setChats(data)
    setChatsFetching(false)
  }

  const getChat = useCallback(async chatId => {
    setCurrentChatFetching(true)
    const response = await api.get(`chats/mine/${chatId}`)
    setCurrentChatFetching(false)

    setCurrentChat(get(response, 'data'))
    setParticipants(get(response, 'data.participants'))
    setMessages(get(response, 'data.messages'))
  }, [])

  useEffect(() => {
    const connectToHub = () => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/api/chat-hub', {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          accessTokenFactory: getJwt
        })
        .configureLogging(LogLevel.Debug)
        .build()

      setHubConnection(connection)

      connection
        .start()
        .then(() => console.log('CONNECTED'))
        .catch(err => console.log(err))
    }

    if (isLoggedIn) {
      fetchChats()
      connectToHub()
    }
  }, [])

  useEffect(() => {
    if (!hubConnection) return

    hubConnection.on('RecieveChat', recieveChat)
    hubConnection.on('GetConnectionId', setConnectionId)
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', deleteChat)
  }, [
    hubConnection,
    recieveMessage,
    setConnectionId,
    recieveParticipant,
    recieveChat,
    deleteChat
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

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
import { get, filter, includes } from 'lodash'

import api from '../services/httpService'
import { isLoggedIn, getJwt } from '../services/authService'
import { ProfileContext } from './ProfileContextProvider'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState(null)
  const [chatsFetching, setChatsFetching] = useState(false)
  const [connectionId, setConnectionId] = useState(null)
  const [hubConnection, setHubConnection] = useState(null)

  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatFetching, setCurrentChatFetching] = useState(false)

  const { profile } = useContext(ProfileContext)

  const recieveMessage = useCallback(
    (chatId, message) => {
      if (chatId !== get(currentChat, 'id')) return

      const updatedMessage = {
        ...message,
        isMyMessage: get(message, 'senderId') === get(profile, 'id')
      }

      const currChatMessages = get(currentChat, 'messages', [])
      setCurrentChat(x => ({
        ...x,
        messages: [...currChatMessages, updatedMessage]
      }))
    },
    [currentChat, profile]
  )

  const recieveChat = useCallback(chat => {
    setChats(x => [chat, ...x])
  }, [])

  const recieveParticipant = useCallback(
    (chat, participant) => {
      console.log(get(participant, 'id'), get(profile, 'id'))

      if (get(participant, 'id') === get(profile, 'id'))
        setChats(x => [chat, ...x])
      if (chat.id !== get(currentChat, 'id')) return

      const currChatParticipants = get(currentChat, 'participants', [])
      setCurrentChat(x => ({
        ...x,
        participants: [...currChatParticipants, participant]
      }))
    },
    [currentChat, profile]
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
    setCurrentChat(get(response, 'data'))
    setCurrentChatFetching(false)
  }, [])

  useEffect(() => {
    const connectToHub = () => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/api/chat-hub', {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          accessTokenFactory: getJwt
        })
        .configureLogging(LogLevel.Information)
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

    hubConnection.onclose(() => alert('DISCONNECTED'))
    hubConnection.on('RecieveChat', recieveChat)
    hubConnection.on('GetConnectionId', cId => setConnectionId(cId))
    hubConnection.on('RecieveMessage', recieveMessage)
    hubConnection.on('RecieveParticipant', recieveParticipant)
    hubConnection.on('DeleteChat', chatId =>
      setChats(prev => filter(prev, x => x.id !== chatId))
    )
  }, [hubConnection, recieveMessage, recieveChat, recieveParticipant])

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatsFetching,
        connectionId,
        currentChat,
        currentChatFetching,
        getChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

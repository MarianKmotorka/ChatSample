import React, { useState, useEffect, createContext } from 'react'
import api from '../services/httpService'
import { isLoggedIn, getJwt } from '../services/authService'
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from '@aspnet/signalr'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState(null)
  const [chatsFetching, setChatsFetching] = useState(false)
  const [connectionId, setConnectionId] = useState(null)

  useEffect(() => {
    const fetchChats = async () => {
      setChatsFetching(true)
      const { data } = await api.get('/chats/mine')
      setChats(data)
      setChatsFetching(false)
    }

    const connectToHub = () => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/api/chat-hub', {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          accessTokenFactory: getJwt
        })
        .configureLogging(LogLevel.Information)
        .build()

      connection.on('GetChats', () => fetchChats())
      connection.on('GetConnectionId', cId => setConnectionId(cId))

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

  return (
    <ChatContext.Provider value={{ chats, chatsFetching, connectionId }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

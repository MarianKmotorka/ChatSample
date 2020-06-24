import React, { useState, useEffect, createContext, useCallback } from 'react'
import { get } from 'lodash'
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

  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatFetching, setCurrentChatFetching] = useState(false)

  const getMessages = async chatId => {
    const { data: messages } = await api.get(`chats/${chatId}/messages`)
    setCurrentChat(prev => ({ ...prev, messages }))
  }

  const getParticipants = async chatId => {
    const { data: participants } = await api.get(`chats/${chatId}/participants`)
    setCurrentChat(prev => ({ ...prev, participants }))
  }

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
      connection.on('GetMessages', getMessages)
      connection.on('GetParticipants', getParticipants)

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

  const getChat = useCallback(async chatId => {
    setCurrentChatFetching(true)
    const response = await api.get(`chats/mine/${chatId}`)
    setCurrentChat(get(response, 'data'))
    setCurrentChatFetching(false)
  }, [])

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

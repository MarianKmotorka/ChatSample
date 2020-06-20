import React, { useEffect, useState, useRef } from 'react'
import { map, get } from 'lodash'
import { Wrapper, ChatButtonLink, CreateChatButton } from './SideMenu.styled'
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from '@aspnet/signalr'

import api from '../../services/httpService'
import Backdrop from '../Backdrop'
import LoadingSpinner from '../LoadingSpinner'
import CreateRoomForm from './CreateRoomForm'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { getJwt } from '../../services/authService'

const SideMenu = () => {
  const [chats, setChats] = useState([])
  const [fetching, setFetching] = useState(true)
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const formRef = useRef()

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/chats/mine')
      setChats(data)
      setFetching(false)
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

      connection.on('GetChats', chats => setChats(chats))

      connection
        .start()
        .then(() => console.log('CONNECTED'))
        .catch(err => console.log(err))
    }

    fetch()
    connectToHub()
  }, [])

  if (fetching)
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    )

  return (
    <>
      {showCreateChatDialog && (
        <Backdrop>
          <CreateRoomForm
            formRef={formRef}
            callback={() => setShowCreateChatDialog(false)}
          />
        </Backdrop>
      )}
      <Wrapper>
        {map(chats, x => (
          <ChatButtonLink key={get(x, 'id')} to={`/chats/${get(x, 'id')}`}>
            {get(x, 'name')}
          </ChatButtonLink>
        ))}
        <CreateChatButton onClick={() => setShowCreateChatDialog(true)}>
          <i className='fas fa-plus'></i>
        </CreateChatButton>
      </Wrapper>
    </>
  )
}

export default SideMenu

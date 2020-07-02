import React, { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { map, get } from 'lodash'

import api from '../../services/httpService'
import CreateRoomForm from './CreateRoomForm'
import Backdrop from '../../components/Backdrop'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'

import {
  Wrapper,
  ChatButtonLink,
  CreateChatButton,
  Badge
} from './ChatsMenu.styled'

const ChatsMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const { chats, chatsFetching } = useContext(ChatContext)
  const formRef = useRef()
  const history = useHistory()

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  const deleteChat = async id => {
    await api.delete(`/chats/${id}`)
    history.push('/chats')
  }

  const createChatCallback = chatId => {
    setShowCreateChatDialog(false)
    history.push(`/chats/${chatId}`)
  }

  if (chatsFetching)
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    )

  return (
    <>
      {showCreateChatDialog && (
        <Backdrop>
          <CreateRoomForm formRef={formRef} callback={createChatCallback} />
        </Backdrop>
      )}
      <Wrapper>
        {map(chats, x => {
          const unreadMessages = get(x, 'unreadMessages')
          const name = get(x, 'name')
          const id = get(x, 'id')

          return (
            <ChatButtonLink key={id} to={`/chats/${id}`}>
              {name}
              <i
                className='fas fa-times'
                onClick={() => deleteChat(get(x, 'id'))}
              ></i>
              {!!unreadMessages && <Badge>{unreadMessages}</Badge>}
            </ChatButtonLink>
          )
        })}
        <CreateChatButton onClick={() => setShowCreateChatDialog(true)}>
          <i className='fas fa-plus'></i>
        </CreateChatButton>
      </Wrapper>
    </>
  )
}

export default ChatsMenu

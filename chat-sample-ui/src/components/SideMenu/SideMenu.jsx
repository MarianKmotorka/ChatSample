import React, { useState, useRef, useContext } from 'react'
import { map, get } from 'lodash'
import { Wrapper, ChatButtonLink, CreateChatButton } from './SideMenu.styled'

import Backdrop from '../Backdrop'
import LoadingSpinner from '../LoadingSpinner'
import CreateRoomForm from './CreateRoomForm'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import api from '../../services/httpService'

const SideMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const { chats, chatsFetching } = useContext(ChatContext)
  const formRef = useRef()

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  const deleteChat = async id => {
    await api.delete(`/chats/${id}`)
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
            <i
              className='fas fa-times'
              onClick={() => deleteChat(get(x, 'id'))}
            ></i>
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

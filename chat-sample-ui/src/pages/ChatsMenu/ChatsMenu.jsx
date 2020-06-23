import React, { useState, useRef, useContext } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { map, get } from 'lodash'
import { useHistory } from 'react-router-dom'

import Backdrop from '../../components/Backdrop'
import { Wrapper, ChatButtonLink, CreateChatButton } from './ChatsMenu.styled'
import LoadingSpinner from '../../components/LoadingSpinner'
import CreateRoomForm from './CreateRoomForm'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import api from '../../services/httpService'

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

export default ChatsMenu

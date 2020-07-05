import React, { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { map, get } from 'lodash'
import { DeleteFilled, PlusOutlined } from '@ant-design/icons'

import api from '../../services/httpService'
import CreateRoomForm from './CreateChatForm'
import Backdrop from '../../components/Backdrop'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'

import {
  Wrapper,
  ChatButtonLink,
  StyledButton,
  StyledBadge
} from './styled/ChatsMenu.styled'

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
        <StyledButton
          onClick={() => setShowCreateChatDialog(true)}
          shape='circle'
          icon={<PlusOutlined />}
        />
        {map(chats, x => {
          const unreadMessages = get(x, 'unreadMessages', 0)
          const name = get(x, 'name')
          const id = get(x, 'id')

          return (
            <StyledBadge key={id} count={unreadMessages} offset={[-5, 5]}>
              <ChatButtonLink to={`/chats/${id}`}>
                {name}
                <DeleteFilled onClick={() => deleteChat(get(x, 'id'))} />
              </ChatButtonLink>
            </StyledBadge>
          )
        })}
      </Wrapper>
    </>
  )
}

export default ChatsMenu

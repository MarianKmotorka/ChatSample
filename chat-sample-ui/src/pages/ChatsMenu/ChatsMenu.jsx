import React, { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { map, get } from 'lodash'
import {
  DeleteFilled,
  PlusOutlined,
  SwapLeftOutlined,
  SwapRightOutlined
} from '@ant-design/icons'

import api from '../../services/httpService'
import CreateRoomForm from './CreateChatForm'
import Backdrop from '../../components/Backdrop'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import { ChatRoleType } from '../../utils/types'

import {
  Wrapper,
  ChatButtonLink,
  StyledButton,
  StyledBadge
} from './styled/ChatsMenu.styled'

const ChatsMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { chats, chatsFetching } = useContext(ChatContext)
  const formRef = useRef()
  const history = useHistory()

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  const deleteChat = async id => {
    history.goBack()
    await api.delete(`/chats/${id}`)
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

  const items = map(chats, x => {
    const unreadMessages = get(x, 'unreadMessages', 0)
    const name = get(x, 'name')
    const id = get(x, 'id')
    const canDeleteChat = get(x, 'chatRole') === ChatRoleType.Admin

    return (
      <StyledBadge key={id} count={unreadMessages} offset={[-5, 5]}>
        <ChatButtonLink to={`/chats/${id}`}>
          <p>{name}</p>
          {canDeleteChat && <DeleteFilled onClick={() => deleteChat(id)} />}
        </ChatButtonLink>
      </StyledBadge>
    )
  })

  return (
    <>
      {showCreateChatDialog && (
        <Backdrop>
          <CreateRoomForm formRef={formRef} callback={createChatCallback} />
        </Backdrop>
      )}
      <Wrapper>
        <StyledButton
          onClick={() => setExpanded(x => !x)}
          shape='circle'
          icon={expanded ? <SwapLeftOutlined /> : <SwapRightOutlined />}
        />
        <StyledButton
          onClick={() => setShowCreateChatDialog(true)}
          shape='circle'
          icon={<PlusOutlined />}
        />
        {expanded && items}
      </Wrapper>
    </>
  )
}

export default ChatsMenu

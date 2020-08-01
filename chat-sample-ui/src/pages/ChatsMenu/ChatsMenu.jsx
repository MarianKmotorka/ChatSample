import React, { useState, useRef, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { map, get, head } from 'lodash'
import { PlusOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'

import CreateRoomForm from './CreateChatForm'
import Backdrop from '../../components/Backdrop'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useOnClickOutside } from '../../utils/useOnClickOutside'
import { ChatContext } from '../../contextProviders/ChatContextProvider'

import {
  Wrapper,
  ChatButtonLink,
  StyledButton,
  StyledBadge,
  ButtonsWrapper,
  ItemsWrapper
} from './styled/ChatsMenu.styled'
import useWindowSize, { MD } from '../../utils/useWindowSize'

const ChatsMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { chats, chatsFetching } = useContext(ChatContext)
  const formRef = useRef()
  const history = useHistory()
  const { width } = useWindowSize()

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  useEffect(() => {
    if (width > MD) setExpanded(true)
    else setExpanded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width > MD])

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

    return (
      <StyledBadge expanded={expanded} key={id} count={unreadMessages} offset={[-5, 5]}>
        <ChatButtonLink to={`/chats/${id}`}>
          <p>{expanded ? name : head(name)}</p>
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
      <Wrapper expanded={expanded}>
        <ButtonsWrapper>
          {width > MD && (
            <StyledButton
              onClick={() => setExpanded(x => !x)}
              shape='circle'
              icon={expanded ? <SwapLeftOutlined /> : <SwapRightOutlined />}
            />
          )}
          <StyledButton
            onClick={() => setShowCreateChatDialog(true)}
            shape='circle'
            icon={<PlusOutlined />}
          />
        </ButtonsWrapper>
        <ItemsWrapper expanded={expanded}>{items}</ItemsWrapper>
      </Wrapper>
    </>
  )
}

export default ChatsMenu

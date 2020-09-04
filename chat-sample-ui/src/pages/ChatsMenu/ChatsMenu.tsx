import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { map, head } from 'lodash'
import { PlusOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import { CSSTransition } from 'react-transition-group'

import CreateChatForm from './CreateChatForm'
import Backdrop from '../../components/Backdrop'
import LoadingSpinner from '../../components/LoadingSpinner'
import useOnClickOutside from '../../utils/useOnClickOutside'
import useWindowSize, { MD } from '../../utils/useWindowSize'
import { ChatContext } from '../../contextProviders'

import {
  Wrapper,
  ChatButtonLink,
  StyledButton,
  StyledBadge,
  ButtonsWrapper,
  ItemsWrapper
} from './styled/ChatsMenu.styled'
import './styled/ChatsMenu.animations.css'

const ChatsMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { chats, chatsFetching } = useContext(ChatContext)
  const { width } = useWindowSize()
  const history = useHistory()
  const formRef = useOnClickOutside<HTMLFormElement>(() => setShowCreateChatDialog(false))

  const isWiderThanMedium = width > MD

  useEffect(() => {
    if (isWiderThanMedium) setExpanded(true)
    else setExpanded(false)
  }, [isWiderThanMedium])

  const createChatCallback = (chatId: string) => {
    setShowCreateChatDialog(false)
    history.push(`/chats/${chatId}`)
  }

  if (chatsFetching)
    return (
      <Wrapper expanded>
        <LoadingSpinner />
      </Wrapper>
    )

  const items = map(chats, x => (
    <StyledBadge key={x.id} count={x.unreadMessages} offset={[-5, 5]}>
      <ChatButtonLink to={`/chats/${x.id}`}>
        <p>{expanded ? x.name : head(x.name)}</p>
      </ChatButtonLink>
    </StyledBadge>
  ))

  return (
    <>
      <CSSTransition
        in={showCreateChatDialog}
        unmountOnExit
        timeout={500}
        classNames='dialog-'
      >
        <Backdrop>
          <CreateChatForm formRef={formRef} callback={createChatCallback} />
        </Backdrop>
      </CSSTransition>

      <CSSTransition in={expanded} appear timeout={400} classNames='wrapper-'>
        <Wrapper expanded={expanded}>
          <ButtonsWrapper>
            {isWiderThanMedium && (
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

          <ItemsWrapper>{items}</ItemsWrapper>
        </Wrapper>
      </CSSTransition>
    </>
  )
}

export default ChatsMenu

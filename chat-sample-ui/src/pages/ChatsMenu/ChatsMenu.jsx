import React, { useState, useRef, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { map, get, head } from 'lodash'
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
  ItemsWrapper,
  AnimationClassesWrapper
} from './styled/ChatsMenu.styled'

const ChatsMenu = () => {
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { chats, chatsFetching } = useContext(ChatContext)
  const formRef = useRef()
  const history = useHistory()
  const { width } = useWindowSize()
  const isWiderThanMedium = width > MD

  useOnClickOutside(formRef, () => setShowCreateChatDialog(false))

  useEffect(() => {
    if (isWiderThanMedium) setExpanded(true)
    else setExpanded(false)
  }, [isWiderThanMedium])

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
      <StyledBadge key={id} count={unreadMessages} offset={[-5, 5]}>
        <ChatButtonLink to={`/chats/${id}`}>
          <p>{expanded ? name : head(name)}</p>
        </ChatButtonLink>
      </StyledBadge>
    )
  })

  return (
    <AnimationClassesWrapper expanded={expanded}>
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
        <Wrapper>
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
    </AnimationClassesWrapper>
  )
}

export default ChatsMenu

import React, { useState, useContext, useEffect } from 'react'
import { map, head } from 'lodash'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { PlusOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'

import CreateChatForm from './CreateChatForm'
import { MD } from '../../utils/useWindowSize'
import Backdrop from '../../components/Backdrop'
import { ChatContext } from '../../contextProviders'
import LoadingSpinner from '../../components/LoadingSpinner'
import {
  useWindowSize,
  useDebounce,
  useOnClickOutside,
  useFocusElement
} from '../../utils'

import {
  Wrapper,
  ChatButtonLink,
  StyledButton,
  StyledBadge,
  ButtonsWrapper,
  ItemsWrapper,
  SearchBox
} from './styled/ChatsMenu.styled'
import './styled/ChatsMenu.animations.css'

const ChatsMenu = () => {
  const [searchText, setSearchText] = useState('')
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { chats, chatsFetching, getChats } = useContext(ChatContext)
  const { width } = useWindowSize()
  const history = useHistory()
  const formRef = useOnClickOutside<HTMLFormElement>(() => setShowCreateChatDialog(false))
  const debouncedSearchText = useDebounce(searchText, 500)
  const inputRef = useFocusElement<HTMLInputElement>(chatsFetching)

  const isWiderThanMedium = width > MD

  useEffect(() => {
    if (isWiderThanMedium) setExpanded(true)
    else setExpanded(false)
  }, [isWiderThanMedium])

  useEffect(() => {
    getChats(debouncedSearchText, 0)
  }, [getChats, debouncedSearchText])

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
        <Wrapper expanded={expanded} renderOver={!isWiderThanMedium && expanded}>
          <ButtonsWrapper expanded={expanded}>
            <StyledButton
              onClick={() => setShowCreateChatDialog(true)}
              shape='circle'
              icon={<PlusOutlined />}
            />

            <StyledButton
              onClick={() => setExpanded(x => !x)}
              shape='circle'
              icon={expanded ? <SwapLeftOutlined /> : <SwapRightOutlined />}
            />
          </ButtonsWrapper>

          {expanded && (
            <SearchBox
              ref={inputRef}
              placeholder='Search...'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          )}

          <ItemsWrapper>{items}</ItemsWrapper>
        </Wrapper>
      </CSSTransition>
    </>
  )
}

export default ChatsMenu

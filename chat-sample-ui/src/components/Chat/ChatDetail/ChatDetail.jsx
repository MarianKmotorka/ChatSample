import React, { useState } from 'react'
import { map, get } from 'lodash'
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  PlusOutlined
} from '@ant-design/icons'

import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import api from '../../../services/httpService'

import {
  Wrapper,
  ParticipantWrapper,
  Header,
  StyledButton,
  Content,
  Photo,
  StyledBadge,
  DropdownItem
} from './ChatDetail.styled'

const ChatDetail = ({ participants, chatId }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleAddParticipant = async user => {
    await api.post(`/chats/${chatId}/participants`, {
      participantId: get(user, 'id')
    })
    setShowDropdown(false)
  }

  const handleRemoveParticipant = async id => {
    await api.delete(`/chats/${chatId}/participants/${id}`)
  }

  const toogleExpanded = () => {
    setExpanded(x => !x)
    setShowDropdown(false)
  }

  const renderPhoto = ({ id, isOnline, picture }) => (
    <StyledBadge
      key={id}
      color={isOnline ? 'green' : 'red'}
      title={isOnline ? 'Online' : 'Offline'}
    >
      <Photo src={picture} referrerPolicy='no-referrer' />
    </StyledBadge>
  )

  const renderDropdownItem = ({ picture, name }) => (
    <DropdownItem>
      <img src={picture} referrerPolicy='no-referrer' alt='' />
      <p>{name}</p>
    </DropdownItem>
  )

  return (
    <Wrapper>
      <Header>
        <StyledButton
          onClick={toogleExpanded}
          shape='circle'
          icon={expanded ? <SwapRightOutlined /> : <SwapLeftOutlined />}
        />
        {expanded && (
          <StyledButton
            onClick={() => setShowDropdown(x => !x)}
            shape='circle'
            icon={<PlusOutlined />}
          />
        )}
      </Header>
      <Content>
        {showDropdown && (
          <SearchableDropdown
            fetchOptions={{
              url: `/chats/${chatId}/participants/new`
            }}
            onChange={handleAddParticipant}
            itemRenderer={renderDropdownItem}
            displayProperty='name'
            width='230px'
          />
        )}
        {map(participants, x =>
          expanded ? (
            <ParticipantWrapper key={x.id} isOnline={x.isOnline}>
              {renderPhoto(x)}
              <p>{x.name}</p>
              <i
                className='fas fa-times'
                onClick={() => handleRemoveParticipant(x.id)}
              ></i>
            </ParticipantWrapper>
          ) : (
            renderPhoto(x)
          )
        )}
      </Content>
    </Wrapper>
  )
}

export default ChatDetail

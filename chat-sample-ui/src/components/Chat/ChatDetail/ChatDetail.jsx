import React, { useState, useContext, useEffect } from 'react'
import { map, get, find } from 'lodash'
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
import { ProfileContext } from '../../../contextProviders/ProfileContextProvider'
import { ChatRoleType } from '../../../utils/types'

const ChatDetail = ({ participants, chatId }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [currentUserId, setCurrentUserId] = useState()
  const { profile } = useContext(ProfileContext)

  useEffect(() => {
    if (!profile) return

    setCurrentUserId(get(profile, 'id'))
  }, [profile])

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

  const currentUserRole = get(
    find(participants, ['id', currentUserId]),
    'chatRole'
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

        {map(participants, participant => {
          const id = get(participant, 'id')
          const name = get(participant, 'name')
          const participantRole = get(participant, 'chatRole')

          const canBeRemoved =
            id === currentUserId ||
            (currentUserRole === ChatRoleType.Admin &&
              participantRole !== ChatRoleType.Admin)

          return expanded ? (
            <ParticipantWrapper key={id}>
              {renderPhoto(participant)}
              <p>{name}</p>
              {canBeRemoved && (
                <i
                  className='fas fa-times'
                  onClick={() => handleRemoveParticipant(id)}
                ></i>
              )}
            </ParticipantWrapper>
          ) : (
            renderPhoto(participant)
          )
        })}
      </Content>
    </Wrapper>
  )
}

export default ChatDetail

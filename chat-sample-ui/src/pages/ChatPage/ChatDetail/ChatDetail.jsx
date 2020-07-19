import React, { useState, useContext, useEffect } from 'react'
import { map, get, find, isEmpty, invert } from 'lodash'
import { SwapLeftOutlined, SwapRightOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import Popover from '../../../components/Popover'

import api from '../../../services/httpService'
import SearchableDropdown from '../../../components/SearchableDropdown/SearchableDropdown'
import { ProfileContext } from '../../../contextProviders/ProfileContextProvider'
import { ChatRoleType } from '../../../utils/types'

import {
  Wrapper,
  ParticipantWrapper,
  Header,
  StyledButton,
  Content,
  Photo,
  StyledBadge,
  DropdownItem,
  StyledMenu
} from './styled/ChatDetail.styled'
import { getContextMenuItems } from './utils'

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

  const renderName = (name, role) => (
    <Popover
      title={name}
      content={
        <p>
          <strong>Chat role: </strong>
          {invert(ChatRoleType)[role]}
        </p>
      }
    >
      <p>{name}</p>
    </Popover>
  )

  const currentUserRole = get(find(participants, ['id', currentUserId]), 'chatRole')

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
          const particiapantId = get(participant, 'id')
          const participantName = get(participant, 'name')
          const participantRole = get(participant, 'chatRole')

          const menuItems = getContextMenuItems(
            particiapantId,
            currentUserId,
            participantRole,
            currentUserRole,
            chatId
          )

          return expanded ? (
            <ParticipantWrapper key={particiapantId}>
              {renderPhoto(participant)}
              {renderName(participantName, participantRole)}
              {!isEmpty(menuItems) && <StyledMenu items={menuItems} />}
            </ParticipantWrapper>
          ) : (
            renderPhoto(participant)
          )
        })}
      </Content>
    </Wrapper>
  )
}

ChatDetail.propTypes = {
  chatId: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ChatDetail
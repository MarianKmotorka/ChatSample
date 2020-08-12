import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { map, get, find, invert } from 'lodash'
import { SwapLeftOutlined, SwapRightOutlined, PlusOutlined } from '@ant-design/icons'

import Tooltip from '../../Tooltip'
import Popover from '../../Popover'
import { getContextMenuItems } from './utils'
import { ChatRoleType } from '../../../utils/types'
import useWindowSize, { SM } from '../../../utils/useWindowSize'
import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import { ProfileContext } from '../../../contextProviders/ProfileContextProvider'

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
} from './ChatDetail.styled'

const ChatDetail = ({
  participants,
  chatId,
  onAddParticipant,
  onDeleteParticipant,
  onSetParticipantAsAdmin
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const { profile } = useContext(ProfileContext)
  const { width } = useWindowSize()

  const isWiderThanSmall = width > SM
  const currentUserId = profile?.id

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
  const handleParticipantAddedInternal = participant => {
    onAddParticipant(participant)
    setShowDropdown(false)
  }

  return (
    <Wrapper
      width={expanded ? '300px' : 'auto'}
      renderOver={!isWiderThanSmall && expanded}
    >
      <Header>
        {isWiderThanSmall && (
          <Tooltip text={expanded ? 'Collapse' : 'Expand'} placement='top'>
            <StyledButton
              onClick={toogleExpanded}
              shape='circle'
              icon={expanded ? <SwapRightOutlined /> : <SwapLeftOutlined />}
            />
          </Tooltip>
        )}
        {expanded && (
          <Tooltip text={showDropdown ? 'Hide' : 'Add participant'} placement='top'>
            <StyledButton
              onClick={() => setShowDropdown(x => !x)}
              shape='circle'
              icon={<PlusOutlined />}
            />
          </Tooltip>
        )}
      </Header>

      <Content>
        {showDropdown && (
          <SearchableDropdown
            fetchOptions={{
              url: `/chats/${chatId}/participants/new`
            }}
            onChange={handleParticipantAddedInternal}
            itemRenderer={renderDropdownItem}
            displayProperty='name'
          />
        )}

        {map(participants, participant => {
          const particiapantId = get(participant, 'id')
          const participantName = get(participant, 'name')
          const participantRole = get(participant, 'chatRole')

          const menuItems = getContextMenuItems({
            particiapantId,
            currentUserId,
            participantRole,
            currentUserRole,
            onDeleteParticipant,
            onSetParticipantAsAdmin
          })

          return expanded ? (
            <ParticipantWrapper key={particiapantId}>
              {renderPhoto(participant)}
              {renderName(participantName, participantRole)}
              <StyledMenu items={menuItems} />
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
  ).isRequired,
  onAddParticipant: PropTypes.func.isRequired,
  onSetParticipantAsAdmin: PropTypes.func.isRequired,
  onDeleteParticipant: PropTypes.func.isRequired
}

export default ChatDetail

import React, { useState, useContext } from 'react'
import { map, find } from 'lodash'
import { SwapLeftOutlined, SwapRightOutlined, PlusOutlined } from '@ant-design/icons'

import Tooltip from '../../Tooltip'
import Popover from '../../Popover'
import { getContextMenuItems } from './utils'
import { ChatRole, IParticipantDto } from '../../../apiContracts/chatContracts'
import useWindowSize, { SM } from '../../../utils/useWindowSize'
import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import { ProfileContext } from '../../../contextProviders'

import {
  Wrapper,
  ParticipantWrapper,
  Header,
  StyledButton,
  Content,
  Photo,
  StyledBadge,
  DropdownItem,
  StyledMenu,
  Text
} from './ChatDetail.styled'

interface IProps {
  participants: IParticipantDto[]
  chatId: string
  onAddParticipant: (participant: IParticipantDto) => void
  onDeleteParticipant: (id: string) => void
  onSetParticipantAsAdmin: (id: string) => void
}

const ChatDetail: React.FC<IProps> = ({
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

  const renderPhoto = ({ id, isOnline, picture }: IParticipantDto) => (
    <StyledBadge
      key={id}
      color={isOnline ? 'green' : 'red'}
      title={isOnline ? 'Online' : 'Offline'}
    >
      <Photo src={picture} referrerPolicy='no-referrer' />
    </StyledBadge>
  )

  const renderDropdownItem = ({ picture, name }: IParticipantDto) => (
    <DropdownItem>
      <img src={picture} referrerPolicy='no-referrer' alt='' />
      <p>{name}</p>
    </DropdownItem>
  )

  const renderName = (name: string, role: ChatRole) => (
    <Popover
      title={name}
      content={
        <p>
          <strong>Chat role: </strong>
          {ChatRole[role]}
        </p>
      }
    >
      <Text>{name}</Text>
    </Popover>
  )

  const currentUserRole = find(participants, ['id', currentUserId])!.chatRole
  const handleParticipantAddedInternal = (participant: IParticipantDto) => {
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
          const menuItems = getContextMenuItems(
            participant.id,
            currentUserId,
            participant.chatRole,
            currentUserRole,
            onDeleteParticipant,
            onSetParticipantAsAdmin
          )

          return expanded ? (
            <ParticipantWrapper key={participant.id}>
              {renderPhoto(participant)}
              {renderName(participant.name, participant.chatRole)}
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

export default ChatDetail

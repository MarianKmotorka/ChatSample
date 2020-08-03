import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map, get, find, invert } from 'lodash'
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Modal } from 'antd'

import Tooltip from '../../Tooltip'
import Popover from '../../Popover'
import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import { ProfileContext } from '../../../contextProviders/ProfileContextProvider'
import { ChatRoleType } from '../../../utils/types'
import useWindowSize, { SM } from '../../../utils/useWindowSize'
import { getContextMenuItems } from './utils'

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
  onDeleteChat,
  onDeleteParticipant,
  onSetParticipantAsAdmin
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentUserId, setCurrentUserId] = useState()
  const [expanded, setExpanded] = useState(true)
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)

  const { profile } = useContext(ProfileContext)
  const { width } = useWindowSize()
  const isWiderThanSmall = width > SM

  useEffect(() => {
    if (!profile) return
    setCurrentUserId(get(profile, 'id'))
  }, [profile])

  useEffect(() => {
    if (isWiderThanSmall) {
      setExpanded(true)
    } else {
      setExpanded(false)
      setShowDropdown(false)
    }
  }, [isWiderThanSmall])

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
  const canDeleteChat = currentUserRole === ChatRoleType.Admin

  return (
    <Wrapper
      width={expanded ? '300px' : 'auto'}
      renderOver={!isWiderThanSmall && expanded}
    >
      <Header>
        <Tooltip text={expanded ? 'Collapse' : 'Expand'} placement='top'>
          <StyledButton
            onClick={toogleExpanded}
            shape='circle'
            icon={expanded ? <SwapRightOutlined /> : <SwapLeftOutlined />}
          />
        </Tooltip>
        {expanded && (
          <Tooltip text={showDropdown ? 'Hide' : 'Add participant'} placement='top'>
            <StyledButton
              onClick={() => setShowDropdown(x => !x)}
              shape='circle'
              icon={<PlusOutlined />}
            />
          </Tooltip>
        )}
        {expanded && canDeleteChat && (
          <Tooltip text='Delete chat' placement='top'>
            <StyledButton
              onClick={() => setShowDeleteChatModal(true)}
              shape='circle'
              icon={<DeleteOutlined />}
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
            onChange={onAddParticipant}
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

      <Modal
        title='Do you really want to delete this chat ?'
        onOk={onDeleteChat}
        onCancel={() => setShowDeleteChatModal(false)}
        okText='Yes, delete the chat.'
        cancelText='No, go back.'
        visible={showDeleteChatModal}
      >
        <p>Be aware of that this action can not be reversed! </p>
      </Modal>
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
  onDeleteParticipant: PropTypes.func.isRequired,
  onDeleteChat: PropTypes.func.isRequired
}

export default ChatDetail

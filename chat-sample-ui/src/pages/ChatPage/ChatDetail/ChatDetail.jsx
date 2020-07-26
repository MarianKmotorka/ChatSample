import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map, get, find, invert } from 'lodash'
import { useHistory } from 'react-router-dom'
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Modal } from 'antd'

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
import Tooltip from '../../../components/Tooltip'

const ChatDetail = ({ participants, chatId }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentUserId, setCurrentUserId] = useState()
  const [expanded, setExpanded] = useState(true)
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)

  const { profile } = useContext(ProfileContext)
  const history = useHistory()

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

  const handleDeleteChat = async () => {
    history.goBack()
    await api.delete(`/chats/${chatId}`)
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
  const canDeleteChat = currentUserRole === ChatRoleType.Admin

  return (
    <Wrapper width={expanded ? '300px' : 'auto'}>
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
            onChange={handleAddParticipant}
            itemRenderer={renderDropdownItem}
            displayProperty='name'
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
              <StyledMenu items={menuItems} />
            </ParticipantWrapper>
          ) : (
            renderPhoto(participant)
          )
        })}
      </Content>

      <Modal
        title='Do you really want to delete this chat ?'
        onOk={handleDeleteChat}
        onCancel={() => setShowDeleteChatModal(false)}
        okText='Yes, delete chat.'
        cancelText='No, go back.'
        visible={showDeleteChatModal}
      >
        <p>Be aware that this action can not be reversed! </p>
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
  ).isRequired
}

export default ChatDetail

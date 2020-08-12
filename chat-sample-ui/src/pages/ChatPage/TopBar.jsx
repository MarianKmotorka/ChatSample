import React, { useContext, useState } from 'react'
import { find } from 'lodash'
import { Button, Modal } from 'antd'
import { DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons'

import { ChatContext } from '../../contextProviders/ChatContextProvider'
import { ProfileContext } from '../../contextProviders/ProfileContextProvider'
import { ChatRoleType } from '../../utils/types'
import Tooltip from '../../components/Tooltip'

import { Wrapper, ChatName, ButtonsWrapper } from './styled/TopBar.styled'

const TopBar = ({ onDeleteChat, onToggleChatDetail }) => {
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)
  const { currentChatId, chats, participants } = useContext(ChatContext)
  const { profile } = useContext(ProfileContext)

  const currentChat = find(chats, ['id', currentChatId])
  const currentUserRole = find(participants, ['id', profile?.id])?.chatRole
  const canDeleteChat = currentUserRole === ChatRoleType.Admin

  return (
    <Wrapper>
      <ChatName>{currentChat?.name}</ChatName>
      <ButtonsWrapper>
        {canDeleteChat && (
          <Tooltip text='Delete chat' placement='top'>
            <Button
              onClick={() => setShowDeleteChatModal(true)}
              shape='circle'
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        )}
        <Tooltip text='Participants' placement='topRight'>
          <Button
            onClick={onToggleChatDetail}
            shape='circle'
            icon={<UserSwitchOutlined />}
          />
        </Tooltip>
      </ButtonsWrapper>

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

export default TopBar

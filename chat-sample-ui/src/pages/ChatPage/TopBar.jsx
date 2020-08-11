import React, { useContext, useState } from 'react'
import { find } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { ChatRoleType } from '../../utils/types'
import { Wrapper, ChatName } from './styled/TopBar.styled'
import { ChatContext } from '../../contextProviders/ChatContextProvider'
import { ProfileContext } from '../../contextProviders/ProfileContextProvider'
import Tooltip from '../../components/Tooltip'

const TopBar = ({ onDeleteChat }) => {
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)
  const { currentChatId, chats, participants } = useContext(ChatContext)
  const { profile } = useContext(ProfileContext)
  const currentChat = find(chats, ['id', currentChatId])

  const currentUserRole = find(participants, ['id', profile?.id])?.chatRole
  const canDeleteChat = currentUserRole === ChatRoleType.Admin

  return (
    <Wrapper>
      <ChatName>{currentChat?.name}</ChatName>
      {canDeleteChat && (
        <Tooltip text='Delete chat' placement='top'>
          <Button
            onClick={() => setShowDeleteChatModal(true)}
            shape='circle'
            size='large'
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      )}

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

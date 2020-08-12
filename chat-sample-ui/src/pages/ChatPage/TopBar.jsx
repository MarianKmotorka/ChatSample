import React, { useContext, useState, useEffect } from 'react'
import { find } from 'lodash'
import { Button, Modal } from 'antd'
import { DeleteFilled, UserSwitchOutlined, EditOutlined } from '@ant-design/icons'

import { ChatContext } from '../../contextProviders/ChatContextProvider'
import { ProfileContext } from '../../contextProviders/ProfileContextProvider'
import { ChatRoleType } from '../../utils/types'
import Tooltip from '../../components/Tooltip'

import {
  Wrapper,
  ChatName,
  ButtonsWrapper,
  ChatNameWrapper,
  ChatNameInput
} from './styled/TopBar.styled'

const TopBar = ({ onDeleteChat, onToggleChatDetail, onRenameChat }) => {
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [chatName, setChatName] = useState('')

  const { currentChatId, chats, participants } = useContext(ChatContext)
  const { profile } = useContext(ProfileContext)

  const currentChat = find(chats, ['id', currentChatId])
  const currentUserRole = find(participants, ['id', profile?.id])?.chatRole
  const canDeleteChat = currentUserRole === ChatRoleType.Admin

  useEffect(() => setChatName(currentChat?.name), [currentChat])

  const handleKeyPressed = e => e.key === 'Enter' && onRenameChat(chatName)

  return (
    <Wrapper>
      <ChatNameWrapper>
        {isRenaming ? (
          <ChatNameInput
            value={chatName}
            onChange={e => setChatName(e.target.value)}
            onKeyPress={handleKeyPressed}
          />
        ) : (
          <>
            <ChatName>{currentChat?.name}</ChatName>
            <Tooltip text='Rename'>
              <Button
                onClick={() => setIsRenaming(true)}
                shape='circle'
                type='ghost'
                icon={<EditOutlined />}
              />
            </Tooltip>
          </>
        )}
      </ChatNameWrapper>

      <ButtonsWrapper>
        {canDeleteChat && (
          <Tooltip text='Delete chat'>
            <Button
              onClick={() => setShowDeleteChatModal(true)}
              shape='circle'
              icon={<DeleteFilled />}
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

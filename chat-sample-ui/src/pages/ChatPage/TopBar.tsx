import React, { useContext, useState, useEffect, useRef } from 'react'
import { find } from 'lodash'
import { Button, Modal } from 'antd'
import { DeleteFilled, UserSwitchOutlined, EditOutlined } from '@ant-design/icons'

import { ProfileContext, ChatContext } from '../../contextProviders'
import { ChatRole } from '../../apiContracts/chatContracts'
import useOnClickOutside from '../../utils/useOnClickOutside'
import Tooltip from '../../components/Tooltip'

import {
  Wrapper,
  ChatName,
  ButtonsWrapper,
  ChatNameWrapper,
  ChatNameInput,
  StyledButton
} from './styled/TopBar.styled'

interface IProps {
  onDeleteChat: () => void
  onToggleChatDetail: () => void
  onRenameChat: (name: string) => void
}

const TopBar: React.FC<IProps> = ({ onDeleteChat, onToggleChatDetail, onRenameChat }) => {
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [chatName, setChatName] = useState('')

  const { currentChatId, chats, participants } = useContext(ChatContext)
  const { profile } = useContext(ProfileContext)
  const chatNameWrapperRef = useRef<HTMLDivElement>(null!)

  const currentChat = find(chats, ['id', currentChatId])
  const currentUserRole = find(participants, ['id', profile?.id])?.chatRole
  const canDeleteChat = currentUserRole === ChatRole.ADMIN

  useEffect(() => setChatName(currentChat?.name || ''), [currentChat])
  useOnClickOutside(chatNameWrapperRef, () => setIsRenaming(false))

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    setIsRenaming(false)
    if (!chatName) return setChatName(currentChat?.name || '')
    if (chatName !== currentChat?.name) onRenameChat(chatName)
  }

  return (
    <Wrapper>
      <ChatNameWrapper ref={chatNameWrapperRef}>
        {isRenaming && (
          <ChatNameInput
            ref={ref => ref && ref.focus()}
            value={chatName}
            onChange={e => setChatName(e.target.value)}
            onKeyPress={handleKeyPressed}
          />
        )}

        {!isRenaming && (
          <>
            <ChatName>{currentChat?.name}</ChatName>
            <Tooltip text='Rename'>
              <StyledButton
                onClick={() => setIsRenaming(true)}
                shape='circle'
                type='text'
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

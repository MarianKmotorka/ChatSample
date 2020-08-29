import React, { memo, useState } from 'react'
import moment from 'moment'
import { DeleteFilled, SyncOutlined } from '@ant-design/icons'

import Tooltip from '../../components/Tooltip'
import { IMessageDto } from '../../apiContracts/chatContracts'
import {
  InnerWrapper,
  Text,
  Avatar,
  StyledButton,
  DeletedText
} from './styled/Message.styled'

export enum MessageShape {
  TOP = 'top',
  TOP_DELAYED = 'top-delayed',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
  STANDALONE = 'standalone',
  STANDALONE_DELAYED = 'standalone-delayed'
}

interface IProps {
  message: IMessageDto
  forwardRef?: React.Ref<HTMLDivElement>
  onDelete: (id: string) => void
  onRecover: (id: string) => void
  shape: MessageShape
}

const Message: React.FC<IProps> = memo(
  ({ message, forwardRef, onDelete, onRecover, shape = MessageShape.STANDALONE }) => {
    const [hovered, setHovered] = useState(false)

    const date = moment(message.date).format('MMMM Do YYYY, H:mm:ss')
    const text = message.isDeleted ? <DeletedText>Deleted</DeletedText> : message.text
    const showAvatar =
      shape === MessageShape.STANDALONE ||
      shape === MessageShape.BOTTOM ||
      shape === MessageShape.STANDALONE_DELAYED

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={forwardRef}
      >
        <InnerWrapper isMyMessage={message.isMyMessage} shape={shape}>
          {!message.isDeleted && message.isMyMessage && (
            <StyledButton
              icon={<DeleteFilled />}
              type='text'
              shape='circle-outline'
              onClick={() => onDelete(message.id)}
              opacity={hovered ? 1 : 0}
              hover_color='red'
            />
          )}

          {message.isDeleted && message.isMyMessage && (
            <StyledButton
              icon={<SyncOutlined />}
              type='text'
              shape='circle-outline'
              onClick={() => onRecover(message.id)}
              opacity={hovered ? 1 : 0}
              hover_color='green'
            />
          )}

          {!message.isMyMessage && (
            <Tooltip text={message.senderName} placement='left'>
              <Avatar
                referrerPolicy='no-referrer'
                src={message.senderPicture}
                isHidden={!showAvatar}
              />
            </Tooltip>
          )}

          <Tooltip text={date} placement='right'>
            <Text isMyMessage={message.isMyMessage} shape={shape}>
              {text}
            </Text>
          </Tooltip>

          {message.isMyMessage && (
            <Tooltip text={message.senderName} placement='right'>
              <Avatar
                referrerPolicy='no-referrer'
                src={message.senderPicture}
                isHidden={!showAvatar}
              />
            </Tooltip>
          )}
        </InnerWrapper>
      </div>
    )
  }
)

export default Message

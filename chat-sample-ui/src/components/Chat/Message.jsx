import React, { memo, useState } from 'react'
import { get, values } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { DeleteFilled, SyncOutlined } from '@ant-design/icons'

import Tooltip from '../../components/Tooltip'
import {
  InnerWrapper,
  Text,
  Avatar,
  StyledButton,
  DeletedText
} from './styled/Message.styled'

export const MessageShape = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
  STANDALONE: 'standalone'
}

const Message = memo(
  ({ message, forwardRef, onDelete, onRecover, shape = MessageShape.STANDALONE }) => {
    const [hovered, setHovered] = useState(false)

    const id = get(message, 'id')
    const name = get(message, 'senderName')
    const picture = get(message, 'senderPicture')
    const isDeleted = get(message, 'isDeleted')
    const isMyMessage = get(message, 'isMyMessage')
    const date = moment(get(message, 'date')).format('MMMM Do YYYY, H:mm')
    const text = isDeleted ? <DeletedText>Deleted</DeletedText> : get(message, 'text')

    const showAvatar = shape === MessageShape.STANDALONE || shape === MessageShape.BOTTOM

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={forwardRef}
      >
        <InnerWrapper isMyMessage={isMyMessage} shape={shape}>
          {!isDeleted && isMyMessage && (
            <StyledButton
              icon={<DeleteFilled />}
              type='text'
              shape='circle-outline'
              onClick={() => onDelete(id)}
              opacity={hovered ? 1 : 0}
              hover_color='red'
            />
          )}

          {isDeleted && isMyMessage && (
            <StyledButton
              icon={<SyncOutlined />}
              type='text'
              shape='circle-outline'
              onClick={() => onRecover(id)}
              opacity={hovered ? 1 : 0}
              hover_color='green'
            />
          )}

          {!isMyMessage && (
            <Tooltip text={name} placement='left'>
              <Avatar referrerPolicy='no-referrer' src={picture} isHidden={!showAvatar} />
            </Tooltip>
          )}

          <Tooltip text={date} placement='right'>
            <Text isMyMessage={message.isMyMessage} shape={shape}>
              {text}
            </Text>
          </Tooltip>

          {isMyMessage && (
            <Tooltip text={name} placement='right'>
              <Avatar referrerPolicy='no-referrer' src={picture} isHidden={!showAvatar} />
            </Tooltip>
          )}
        </InnerWrapper>
      </div>
    )
  }
)

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    isMyMessage: PropTypes.bool.isRequired,
    senderPicture: PropTypes.string.isRequired
  }).isRequired,
  shape: PropTypes.oneOf(values(MessageShape)),
  onDelete: PropTypes.func.isRequired,
  onRecover: PropTypes.func.isRequired
}

export default Message

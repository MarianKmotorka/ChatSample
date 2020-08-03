import React, { memo, useState } from 'react'
import { get, values } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { DeleteFilled } from '@ant-design/icons'

import Tooltip from '../../components/Tooltip'
import { InnerWrapper, Text, Avatar, DeleteButton } from './styled/Message.styled'

export const MessageShape = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
  STANDALONE: 'standalone'
}

const Message = memo(
  ({ message, forwardRef, onDelete, shape = MessageShape.STANDALONE }) => {
    const [showDelete, setShowDelete] = useState(false)

    const id = get(message, 'id')
    const name = get(message, 'senderName')
    const picture = get(message, 'senderPicture')
    const isMyMessage = get(message, 'isMyMessage')
    const date = moment(get(message, 'date')).format('MMMM Do YYYY, H:mm')

    const showAvatar = shape === MessageShape.STANDALONE || shape === MessageShape.BOTTOM

    return (
      <div
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        ref={forwardRef}
      >
        <InnerWrapper isMyMessage={isMyMessage} shape={shape}>
          {isMyMessage && (
            <DeleteButton
              icon={<DeleteFilled />}
              type='text'
              shape='circle-outline'
              onClick={() => onDelete(id)}
              visible={showDelete}
            />
          )}

          {!isMyMessage && (
            <Tooltip text={name} placement='left'>
              <Avatar referrerPolicy='no-referrer' src={picture} isHidden={!showAvatar} />
            </Tooltip>
          )}

          <Tooltip text={date} placement='right'>
            <Text isMyMessage={message.isMyMessage} shape={shape}>
              {message.text}
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
  onDelete: PropTypes.func.isRequired
}

export default Message

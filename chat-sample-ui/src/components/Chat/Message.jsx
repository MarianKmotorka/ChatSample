import React, { memo } from 'react'
import { get, values } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'

import Tooltip from '../../components/Tooltip'
import { Wrapper, Text, Avatar } from './styled/Message.styled'

export const MessageShape = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
  STANDALONE: 'standalone'
}

const Message = memo(({ message, forwardRef, shape = MessageShape.STANDALONE }) => {
  const isMyMessage = get(message, 'isMyMessage')
  const name = get(message, 'senderName')
  const picture = get(message, 'senderPicture')
  const date = moment(get(message, 'date')).format('MMMM Do YYYY, H:mm')
  const showAvatar = shape === MessageShape.STANDALONE || shape === MessageShape.BOTTOM
  const tooltipPlacement = isMyMessage ? 'left' : 'right'

  return (
    <Wrapper isMyMessage={isMyMessage} shape={shape} ref={forwardRef}>
      {!isMyMessage && (
        <Tooltip text={name} placement='left'>
          <Avatar referrerPolicy='no-referrer' src={picture} isHidden={!showAvatar} />
        </Tooltip>
      )}
      <Tooltip text={date} placement={tooltipPlacement}>
        <Text isMyMessage={message.isMyMessage} shape={shape}>
          {message.text}
        </Text>
      </Tooltip>
      {isMyMessage && (
        <Tooltip text={name} placement='right'>
          <Avatar referrerPolicy='no-referrer' src={picture} isHidden={!showAvatar} />
        </Tooltip>
      )}
    </Wrapper>
  )
})

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
  shape: PropTypes.oneOf(values(MessageShape))
}

export default Message

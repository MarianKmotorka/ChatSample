import React, { memo } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { MessageWrapper, MessageInfo, MessageDate, Text } from './styled/Chat.styled'

const Message = memo(({ message, forwardRef }) => (
  <MessageWrapper isMyMessage={message.isMyMessage} ref={forwardRef}>
    <MessageInfo>
      <img referrerPolicy='no-referrer' src={message.senderPicture} alt='' />
      <p>{message.senderName}</p>
      <MessageDate>{moment(message.date).fromNow()}</MessageDate>
    </MessageInfo>
    <Text className='wordwrap'>{message.text}</Text>
  </MessageWrapper>
))

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    isMyMessage: PropTypes.bool.isRequired,
    senderPicture: PropTypes.string.isRequired
  }).isRequired
}

export default Message

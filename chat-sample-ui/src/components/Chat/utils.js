import { MessageShape } from './Message'
import { indexOf, get } from 'lodash'

const BORDER_RADIUS = 25
const NO_RADIUS = 5

export const getMessageBorderRadius = ({ isMyMessage, shape }) => {
  let topLeft = BORDER_RADIUS
  let topRight = BORDER_RADIUS
  let bottomLeft = BORDER_RADIUS
  let bottomRight = BORDER_RADIUS

  if (isMyMessage) {
    topRight =
      shape === MessageShape.BOTTOM || shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
    bottomRight =
      shape === MessageShape.TOP || shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
  } else {
    topLeft =
      shape === MessageShape.BOTTOM || shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
    bottomLeft =
      shape === MessageShape.TOP || shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
  }

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

export const getMessageShape = (allMessages, message) => {
  var lastIndex = get(allMessages, 'length', 0) - 1

  var messageIndex = indexOf(allMessages, message)
  var messageAbove = messageIndex > 0 ? allMessages[messageIndex - 1] : null
  var messageBellow = messageIndex < lastIndex ? allMessages[messageIndex + 1] : null

  var messageSenderId = get(message, 'senderId')
  var messageAboveSenderId = get(messageAbove, 'senderId')
  var messageBellowSenderId = get(messageBellow, 'senderId')

  if (
    messageSenderId === messageAboveSenderId &&
    messageSenderId === messageBellowSenderId
  )
    return MessageShape.MIDDLE
  if (messageSenderId === messageAboveSenderId) return MessageShape.BOTTOM
  if (messageSenderId === messageBellowSenderId) return MessageShape.TOP

  return MessageShape.STANDALONE
}

import { MessageShape, Message } from './Message'
import { indexOf } from 'lodash'

const BORDER_RADIUS = 25
const NO_RADIUS = 5

export const getMessageBorderRadius = (isMyMessage: boolean, shape: MessageShape) => {
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

export const getMessageShape = (allMessages: Message[], message: Message) => {
  var lastIndex = allMessages.length - 1

  var messageIndex = indexOf(allMessages, message)
  var messageAbove = messageIndex > 0 ? allMessages[messageIndex - 1] : null
  var messageBellow = messageIndex < lastIndex ? allMessages[messageIndex + 1] : null

  if (
    message.senderId === messageAbove?.senderId &&
    message.senderId === messageBellow?.senderId
  )
    return MessageShape.MIDDLE
  if (message.senderId === messageAbove?.senderId) return MessageShape.BOTTOM
  if (message.senderId === messageBellow?.senderId) return MessageShape.TOP

  return MessageShape.STANDALONE
}

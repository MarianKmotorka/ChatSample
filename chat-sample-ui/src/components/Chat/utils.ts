import { MessageShape } from './Message/Message'
import { indexOf } from 'lodash'
import { IMessageDto } from '../../apiContracts/chatContracts'

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
      shape === MessageShape.TOP ||
      shape === MessageShape.TOP_DELAYED ||
      shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
  } else {
    topLeft =
      shape === MessageShape.BOTTOM || shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS

    bottomLeft =
      shape === MessageShape.TOP ||
      shape === MessageShape.TOP_DELAYED ||
      shape === MessageShape.MIDDLE
        ? NO_RADIUS
        : BORDER_RADIUS
  }

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

const isDelayedMessage = (message: IMessageDto, otherMessage?: IMessageDto) =>
  Math.abs(
    new Date(message.date).getTime() - new Date(otherMessage?.date || 0).getTime()
  ) /
    60000 >
  10

export const getMessageShape = (allMessages: IMessageDto[], message: IMessageDto) => {
  const lastIndex = allMessages.length - 1
  const messageIndex = indexOf(allMessages, message)
  const messageAbove = messageIndex > 0 ? allMessages[messageIndex - 1] : undefined
  const messageBellow =
    messageIndex < lastIndex ? allMessages[messageIndex + 1] : undefined

  const isDelayedFromAbove = isDelayedMessage(message, messageAbove)
  const isDelayedFromBellow = isDelayedMessage(message, messageBellow)

  if (
    isDelayedFromAbove &&
    (isDelayedFromBellow || message.senderId !== messageBellow?.senderId)
  )
    return MessageShape.STANDALONE_DELAYED

  if (
    (message.senderId !== messageAbove?.senderId &&
      message.senderId !== messageBellow?.senderId) ||
    (isDelayedFromBellow && message.senderId !== messageAbove?.senderId)
  )
    return MessageShape.STANDALONE

  if (message.senderId === messageBellow?.senderId && isDelayedFromAbove)
    return MessageShape.TOP_DELAYED

  if (
    message.senderId === messageBellow?.senderId &&
    message.senderId !== messageAbove?.senderId &&
    !isDelayedFromBellow &&
    !isDelayedFromAbove
  )
    return MessageShape.TOP

  if (
    message.senderId === messageAbove?.senderId &&
    messageAbove?.senderId === messageBellow?.senderId &&
    !isDelayedFromAbove &&
    !isDelayedFromBellow
  )
    return MessageShape.MIDDLE

  return MessageShape.BOTTOM
}

import { getMessageShape } from '../utils'
import { IMessageDto } from '../../../apiContracts/chatContracts'
import { MessageShape } from '../Message/Message'

class MessageMock implements IMessageDto {
  id: string
  text: string
  date: Date
  senderName: string
  senderId: string
  isMyMessage: boolean
  isDeleted: boolean
  senderPicture: string

  constructor(isMyMessage: boolean, date: string) {
    const myId = 'abc'
    const hisId = '123'

    this.id = 'id -> does not need to be unique in this test'
    this.text = 'bla bla bla'
    this.date = new Date(date)
    this.senderName = 'bla bla'
    this.senderId = isMyMessage ? myId : hisId
    this.isMyMessage = isMyMessage
    this.isDeleted = false
    this.senderPicture = 'https://picture'
  }

  // Note: used to create message with new reference
  copy = () => new MessageMock(this.isMyMessage, this.date.toString())
}

const myMessage2010 = new MessageMock(true, '2010')
const myMessage2011 = new MessageMock(true, '2011')
const myMessage2012 = new MessageMock(true, '2012')
const myMessage2013 = new MessageMock(true, '2013')

const hisMessage2010 = new MessageMock(false, '2010')
const hisMessage2011 = new MessageMock(false, '2011')
const hisMessage2012 = new MessageMock(false, '2012')

it('Returns correct shape', () => {
  const messages = [
    myMessage2010,
    myMessage2011,
    myMessage2011.copy(),
    myMessage2011.copy()
  ]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.TOP_DELAYED)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.MIDDLE)
  expect(getMessageShape(messages, messages[3])).toBe(MessageShape.BOTTOM)
})

it('Returns correct shape', () => {
  const messages = [myMessage2010, myMessage2011, myMessage2012]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.STANDALONE_DELAYED)
})

it('Returns correct shape', () => {
  const messages = [
    myMessage2010,
    hisMessage2010,
    hisMessage2010.copy(),
    myMessage2010.copy()
  ]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.TOP)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.BOTTOM)
  expect(getMessageShape(messages, messages[3])).toBe(MessageShape.STANDALONE)
})

it('Returns correct shape', () => {
  const messages = [myMessage2010, hisMessage2011, hisMessage2012, myMessage2013]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.STANDALONE_DELAYED)
  expect(getMessageShape(messages, messages[3])).toBe(MessageShape.STANDALONE_DELAYED)
})

it('Returns correct shape', () => {
  const messages = [myMessage2010, myMessage2010.copy(), hisMessage2010, hisMessage2011]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.TOP_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.BOTTOM)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.STANDALONE)
  expect(getMessageShape(messages, messages[3])).toBe(MessageShape.STANDALONE_DELAYED)
})

it('Returns correct shape', () => {
  const messages = [
    myMessage2010,
    myMessage2010.copy(),
    hisMessage2010,
    hisMessage2010.copy(),
    myMessage2011
  ]

  expect(getMessageShape(messages, messages[0])).toBe(MessageShape.TOP_DELAYED)
  expect(getMessageShape(messages, messages[1])).toBe(MessageShape.BOTTOM)
  expect(getMessageShape(messages, messages[2])).toBe(MessageShape.TOP)
  expect(getMessageShape(messages, messages[3])).toBe(MessageShape.BOTTOM)
  expect(getMessageShape(messages, messages[4])).toBe(MessageShape.STANDALONE_DELAYED)
})

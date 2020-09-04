export interface IMessageDto {
  id: string
  text: string
  date: Date
  senderName: string
  senderId: string
  isMyMessage: boolean
  isDeleted: boolean
  senderPicture: string
}

export type ChatRole = 'admin' | 'participant'

export interface IParticipantDto {
  id: string
  name: string
  picture: string
  isOnline: boolean
  chatRole: ChatRole
}

export interface IChatDto {
  id: string
  name: string
  unreadMessages: number
  charRole: ChatRole
}

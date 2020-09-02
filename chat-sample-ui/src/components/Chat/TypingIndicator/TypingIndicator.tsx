import React from 'react'
import { isEmpty } from 'lodash'
import { IParticipantDto } from '../../../apiContracts/chatContracts'
import { Dot, DotsWrapper, Wrapper, Photo } from './TypingIndicator.styled'

interface IProps {
  typingParticipants: IParticipantDto[]
}

const TypingIndicator: React.FC<IProps> = ({ typingParticipants }) => {
  if (isEmpty(typingParticipants)) return null

  return (
    <Wrapper>
      {typingParticipants.map((x, index) => (
        <Photo shiftLeft={index * 10} src={x.picture} referrerPolicy='no-referrer' />
      ))}

      <DotsWrapper shiftLeft={(typingParticipants.length - 1) * 10}>
        <Dot />
        <Dot />
        <Dot />
      </DotsWrapper>
    </Wrapper>
  )
}

export default TypingIndicator

import React from 'react'
import { map, get } from 'lodash'
import { Wrapper, ParticipantWrapper, Header } from './ChatDetail.styled'

const ChatDetail = ({ participants }) => {
  console.log(participants)

  return (
    <Wrapper>
      <Header>Participants</Header>
      {map(participants, x => (
        <ParticipantWrapper>
          <img src={x.picture} alt='' />
          <p>{x.name}</p>
        </ParticipantWrapper>
      ))}
    </Wrapper>
  )
}

export default ChatDetail

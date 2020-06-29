import React, { useState } from 'react'
import { map, get } from 'lodash'
import { Wrapper, ParticipantWrapper, Header } from './ChatDetail.styled'
import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import api from '../../../services/httpService'

const ChatDetail = ({ participants, chatId }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleAddParticipant = async user => {
    await api.post(`/chats/${chatId}/participants`, {
      participantId: get(user, 'id')
    })
    setShowDropdown(false)
  }

  const handleRemoveParticipant = async id => {
    await api.delete(`/chats/${chatId}/participants/${id}`)
  }

  return (
    <Wrapper>
      <Header>
        <p>Participants</p>
        <i className='fas fa-plus' onClick={() => setShowDropdown(x => !x)} />
      </Header>
      {showDropdown && (
        <SearchableDropdown
          fetchOptions={{
            url: '/users',
            formatter: x => ({ id: x.id, value: x.name })
          }}
          onChange={handleAddParticipant}
        />
      )}
      {map(participants, x => (
        <ParticipantWrapper key={x.id}>
          <img src={x.picture} alt='' />
          <p>{x.name}</p>
          <i
            className='fas fa-times'
            onClick={() => handleRemoveParticipant(x.id)}
          ></i>
        </ParticipantWrapper>
      ))}
    </Wrapper>
  )
}

export default ChatDetail

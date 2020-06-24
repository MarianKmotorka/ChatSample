import React, { useState } from 'react'
import { map, get } from 'lodash'
import { Wrapper, ParticipantWrapper, Header } from './ChatDetail.styled'
import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'

const ChatDetail = ({ participants }) => {
  const [showDropdown, setShowDropdown] = useState(false)

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
        />
      )}
      {map(participants, x => (
        <ParticipantWrapper key={x.id}>
          <img src={x.picture} alt='' />
          <p>{x.name}</p>
        </ParticipantWrapper>
      ))}
    </Wrapper>
  )
}

export default ChatDetail

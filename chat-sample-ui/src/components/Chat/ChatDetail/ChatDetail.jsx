import React, { useState } from 'react'
import { map, get } from 'lodash'
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  PlusOutlined
} from '@ant-design/icons'

import SearchableDropdown from '../../SearchableDropdown/SearchableDropdown'
import api from '../../../services/httpService'

import {
  Wrapper,
  ParticipantWrapper,
  Header,
  StyledButton,
  Content,
  Photo
} from './ChatDetail.styled'

const ChatDetail = ({ participants, chatId }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleAddParticipant = async user => {
    await api.post(`/chats/${chatId}/participants`, {
      participantId: get(user, 'id')
    })
    setShowDropdown(false)
  }

  const handleRemoveParticipant = async id => {
    await api.delete(`/chats/${chatId}/participants/${id}`)
  }

  const toogleExpanded = () => {
    setExpanded(x => !x)
    setShowDropdown(false)
  }

  return (
    <Wrapper>
      <Header>
        <StyledButton
          onClick={toogleExpanded}
          shape='circle'
          icon={expanded ? <SwapRightOutlined /> : <SwapLeftOutlined />}
        />
        {expanded && (
          <StyledButton
            onClick={() => setShowDropdown(x => !x)}
            shape='circle'
            icon={<PlusOutlined />}
          />
        )}
      </Header>
      <Content>
        {showDropdown && (
          <SearchableDropdown
            width='230px'
            fetchOptions={{
              url: `/chats/${chatId}/participants/new`,
              formatter: x => ({ id: x.id, value: x.name })
            }}
            onChange={handleAddParticipant}
          />
        )}
        {map(participants, x =>
          expanded ? (
            <ParticipantWrapper key={x.id} isOnline={x.isOnline}>
              <Photo src={x.picture} referrerPolicy='no-referrer' />
              <p>{x.name}</p>
              <i
                className='fas fa-times'
                onClick={() => handleRemoveParticipant(x.id)}
              ></i>
            </ParticipantWrapper>
          ) : (
            <Photo src={x.picture} referrerPolicy='no-referrer' />
          )
        )}
      </Content>
    </Wrapper>
  )
}

export default ChatDetail

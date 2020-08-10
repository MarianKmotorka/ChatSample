import React, { useState, useRef, useEffect } from 'react'
import { get } from 'lodash'
import api from '../../services/httpService'
import { Wrapper, Header, Content, StyledButton } from './styled/CreateChatForm.styled'

const CreateChatForm = ({ formRef, callback }) => {
  const [name, setName] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const input = get(inputRef, 'current')
    input && input.focus()
  }, [])

  const createChat = async e => {
    e.preventDefault()

    if (name) {
      const reponse = await api.post('/chats', { name })
      callback(get(reponse, 'data'))
    }
  }

  return (
    <Wrapper ref={formRef} onSubmit={createChat}>
      <Header>Create chat</Header>
      <Content>
        <p>Name:</p>
        <input
          ref={inputRef}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <StyledButton type='primary' onClick={createChat}>
          Create
        </StyledButton>
      </Content>
    </Wrapper>
  )
}

export default CreateChatForm

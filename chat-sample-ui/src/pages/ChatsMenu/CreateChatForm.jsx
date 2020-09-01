import React, { useState, useRef, useEffect } from 'react'
import { get } from 'lodash'
import api from '../../services/httpService'
import {
  WrapperForm,
  Header,
  Content,
  StyledButton,
  Text
} from './styled/CreateChatForm.styled'

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
    <WrapperForm ref={formRef} onSubmit={createChat}>
      <Header>Create chat</Header>
      <Content>
        <div>
          <Text>Name:</Text>
          <input
            ref={inputRef}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <StyledButton shape='round' text onClick={createChat}>
          Create
        </StyledButton>
      </Content>
    </WrapperForm>
  )
}

export default CreateChatForm

import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/httpService'
import {
  WrapperForm,
  Header,
  Content,
  StyledButton,
  Text
} from './styled/CreateChatForm.styled'

interface IProps {
  formRef: React.RefObject<HTMLFormElement>
  callback: (createdChatId: string) => void
}

const CreateChatForm: React.FC<IProps> = ({ formRef, callback }) => {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null!)

  useEffect(() => inputRef?.current?.focus(), [])

  const createChat = async (e: React.FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault()

    if (name) {
      const response = await api.post('/chats', { name })
      callback(response?.data)
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
        <StyledButton shape='round' text onClick={_ => createChat(null)}>
          Create
        </StyledButton>
      </Content>
    </WrapperForm>
  )
}

export default CreateChatForm

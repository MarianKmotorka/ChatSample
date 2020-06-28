import React, { useState, useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import api from '../../services/httpService'
import colors from '../../utils/colors.json'
import { ChatContext } from '../../contextProviders/ChatContextProvider'

const Form = styled.form`
  height: 50vh;
  width: 50%;
  max-width: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: black solid 1.5px;
`

const Header = styled.div`
  background: ${colors.secondary};
  color: ${colors.main};
  font-size: 30px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  padding: 7px;
`

const Content = styled.div`
  background: ${colors.main};
  color: ${colors.secondaryDark};
  flex: 1;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & p {
    color: white;
  }

  & input {
    width: 80%;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 18px;
    padding: 5px 10px;

    &:focus {
      outline: none;
    }
  }

  & button {
    padding: 2px 4px;
    margin-top: 8px;
    outline: transparent;
    border-radius: 16px;
    border: transparent;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${colors.secondary};
    color: ${colors.main};
    font-size: 20px;
    transition: all 0.2s ease;

    &:hover {
      background: ${colors.main};
      color: ${colors.secondary};
      transform: scale(1.4);
    }
  }
`

const CreateRoomForm = ({ formRef, callback }) => {
  const [name, setName] = useState('')
  const { connectionId } = useContext(ChatContext)
  const inputRef = useRef()

  useEffect(() => {
    const input = get(inputRef, 'current')
    input && input.focus()
  }, [])

  const createChat = async e => {
    e.preventDefault()
    if (name) {
      const reponse = await api.post('/chats', { name, connectionId })
      callback(get(reponse, 'data'))
    }
  }

  return (
    <Form ref={formRef} onSubmit={createChat}>
      <Header>Create chat</Header>
      <Content>
        <p>Name:</p>
        <input
          ref={inputRef}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <button>Create</button>
      </Content>
    </Form>
  )
}

export default CreateRoomForm

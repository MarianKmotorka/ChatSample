import React, { useState, useContext } from 'react'
import api from '../../services/httpService'
import styled from 'styled-components'
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
    padding: 8px;
    outline: transparent;
    border-radius: 6px;
    border: transparent;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${colors.main};
    color: ${colors.secondary};
    font-size: 20px;
    transition: color 0.3s;

    &:hover {
      color: ${colors.ternary};
    }
  }
`

const CreateRoomForm = ({ formRef, callback }) => {
  const [name, setName] = useState('')
  const { connectionId } = useContext(ChatContext)

  const createChat = async e => {
    e.preventDefault()
    if (name) {
      await api.post('/chats', { name, connectionId })
      callback()
    }
  }

  return (
    <Form ref={formRef} onSubmit={createChat}>
      <Header>Create chat</Header>
      <Content>
        <p>Name:</p>
        <input value={name} onChange={({ target }) => setName(target.value)} />
        <button>Create</button>
      </Content>
    </Form>
  )
}

export default CreateRoomForm

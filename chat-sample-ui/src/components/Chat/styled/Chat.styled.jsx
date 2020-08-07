import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  background: #eef2f3;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.lightGray};
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    font-size: 16px;
    padding: 6px 15px;
    outline: none;
    border: none;
    border-radius: 22px;
    background: ${({ theme }) => theme.dimGray};
    color: ${({ theme }) => theme.white};
  }
`

export const StyledButton = styled(Button)`
  flex: 1;
  background: ${({ theme }) => theme.marigold};
  color: ${({ theme }) => theme.blackCoffee};
  border: none;
  max-width: 150px;
  margin: 0 15px 0 20px;
  font-size: 16px;

  :hover {
    background: ${({ theme }) => theme.red};
  }
`

export const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;
  background: ${({ theme }) => theme.white};
  padding-top: 10px;
  padding-bottom: 6px;

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }
`

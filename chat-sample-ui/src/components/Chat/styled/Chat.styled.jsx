import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: #eef2f3;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.lightGray};
  align-items: center;
  padding: 10px;

  & input {
    flex: 4;
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
  max-width: 200px;
  margin: 0 15px 0 25px;
  font-size: 15px;

  &:hover {
    background: ${({ theme }) => theme.red};
  }
`

export const LoadMoreButton = styled(Button)`
  margin-bottom: 50px;
  display: block;
  width: 100%;
  border: none;
  box-shadow: 0px 10px 20px #ededed;
`

export const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;
  background: ${({ theme }) => theme.white};

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }
`

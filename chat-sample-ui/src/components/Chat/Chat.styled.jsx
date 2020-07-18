import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

export const ChatWithInput = styled.div`
  background: #eef2f3;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const InputWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.blackCoffee};
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

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px 10px;
  border-radius: 10px;
  border: 1.5px grey solid;
  max-width: 55%;

  background: ${({ isMyMessage, theme }) => (isMyMessage ? theme.gold : theme.white)};

  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};

  color: ${({ theme }) => theme.black};

  @media only screen and (max-width: 600px) {
    max-width: 80%;
  }
`

export const MessageInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  font-size: 17px;
  & img {
    margin-right: 10px;
    width: 30px;
    border-radius: 50%;
  }
`
export const Text = styled.p`
  font-size: 18px;
`

export const MessageDate = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-left: auto;
`

import styled from 'styled-components'
import colors from '../../utils/colors.json'

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
  border-top: 2px solid ${colors.secondaryDark};
  background: white;
  & input {
    flex: 4;
    font-size: 18px;
    padding: 8px 15px;
    outline: none;
    border: none;
    border-radius: 0 10px 10px 0;
  }

  & button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: linear-gradient(-90deg, ${colors.secondary}, white);
    cursor: pointer;
    color: ${colors.secondaryDark};
    font-size: 20px;

    &:focus {
      outline: none;
    }

    & > * {
      margin-right: 5px;
    }
  }
`

export const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;

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
  margin: 8px;
  border-radius: 10px;
  border: 1.5px grey solid;
  max-width: 55%;

  background: ${({ isMyMessage }) =>
    isMyMessage ? colors.mainDark : colors.ternary};

  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};
  color: ${({ isMyMessage }) => (isMyMessage ? colors.ternary : 'black')};

  @media only screen and (max-width: 600px) {
    max-width: 80%;
  }
`

export const MessageInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
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

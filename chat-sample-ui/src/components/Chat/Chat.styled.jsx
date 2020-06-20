import styled from 'styled-components'
import colors from '../../utils/colors.json'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #eef2f3;
  display: flex;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  display: flex;
  border-top: 2px solid ${colors.secondaryDark};
  background: ${colors.secondary};
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
    background: ${colors.secondary};
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

export const ImageAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  & img {
    margin-right: 10px;
    width: 30px;
    border-radius: 50%;
  }
`

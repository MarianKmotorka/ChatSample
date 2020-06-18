import styled from 'styled-components'
import colors from '../../utils/colors.json'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: ${colors.ternary};
  display: flex;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  display: flex;

  & input {
    flex: 4;
    font-size: 18px;
    padding: 8px 3px;
    outline: none;
    border: none;
  }

  & button {
    flex: 1;
  }
`

export const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;
  background: lightcoral;
`

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  width: 40%;
  background: lightblue;

  margin-left: ${({ toRight }) => (toRight ? 'auto' : '5px')};
`

export const ImageAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & img {
    margin-right: 10px;
    width: 30px;
    border-radius: 50%;
  }
`

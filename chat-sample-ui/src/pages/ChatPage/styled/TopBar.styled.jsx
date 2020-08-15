import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  background: ${({ theme }) => theme.bg200};
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  border-left: ${({ theme }) => theme.bg400} 0.5px solid;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  * + * {
    margin-left: 10px;
  }
`

export const StyledButton = styled(Button)`
  transform: scale(1.1);
  color: ${({ theme }) => theme.textPrimary};
  :hover,
  :focus {
    color: ${({ theme }) => theme.textPrimary};
  }
`

export const ChatNameWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  * + * {
    margin-left: 5px;
  }
`

export const ChatName = styled.h2`
  color: ${({ theme }) => theme.textPrimary};
`

export const ChatNameInput = styled.input`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 21px;
  background: transparent;
  font-style: italic;
  border: none;
  outline: none;
`

import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  background: #eef2f3;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  display: flex;
  height: 56px;
  background: ${({ theme }) => theme.bg100};
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    font-size: 16px;
    padding: 6px 15px;
    outline: none;
    border: none;
    border-radius: 22px;
    background: ${({ theme }) => theme.bg400};
    color: ${({ theme }) => theme.textPrimary};
  }
`

export const StyledButton = styled(Button)<{ color?: string }>`
  color: ${({ theme, color }) => color && theme[color]};
  margin-right: 5px;
  svg,
  i {
    font-size: 25px;
  }
  :hover,
  :focus {
    color: ${({ theme, color }) => color && theme[color]};
  }
`

export const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;
  background: ${({ theme }) => theme.bg100};
  padding: 10px 0;
`

export const TimeStamp = styled.p`
  margin: 40px;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.bg300};
  line-height: 0.1em;
  opacity: 0.6;

  span {
    padding: 0 30px;
    background: ${({ theme }) => theme.bg100};
  }
`

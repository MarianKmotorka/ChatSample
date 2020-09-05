import styled from 'styled-components'
import Button from '../Button'

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
    background: ${({ theme }) => theme.bg200};
    color: ${({ theme }) => theme.text};
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  }
`

export const StyledButton = styled(Button)<{ margin?: string }>`
  ${({ margin }) => margin && `margin: ${margin}`};
  svg,
  i {
    font-size: 25px;
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
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.bg300};
  line-height: 0.1em;
  opacity: 0.6;

  span {
    padding: 0 30px;
    background: ${({ theme }) => theme.bg100};
  }
`

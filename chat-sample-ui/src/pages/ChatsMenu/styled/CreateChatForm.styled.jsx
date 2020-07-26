import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.form`
  height: 50vh;
  width: 50%;
  max-width: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`

export const Header = styled.div`
  font-size: 30px;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.marigold};
  display: flex;
  justify-content: center;
  padding: 7px;
`

export const Content = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.lightGray};
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;

  & p {
    color: ${({ theme }) => theme.blackCoffee};
    margin: 0 auto 10px 0;
    font-weight: 500;
    font-size: 16px;
  }

  & input {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 18px;
    padding: 5px 10px;

    &:focus {
      outline: none;
    }
  }
`

export const StyledButton = styled(Button)`
  width: 60%;
`

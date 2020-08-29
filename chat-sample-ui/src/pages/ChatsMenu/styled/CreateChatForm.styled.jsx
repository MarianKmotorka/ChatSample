import styled from 'styled-components'
import { Button } from 'antd'

export const WrapperForm = styled.form`
  height: 350px;
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
`

export const Header = styled.div`
  font-size: 30px;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 7px;
`

export const Content = styled.div`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.bg300};
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;

  > div {
    width: 100%;
  }

  p {
    margin: 0 auto 2px 0;
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.textPrimary};
  }

  input {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 18px;
    padding: 5px 10px;
    border: none;
    color: ${({ theme }) => theme.black};

    &:focus {
      outline: none;
    }
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
`

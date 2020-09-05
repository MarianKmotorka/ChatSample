import styled from 'styled-components'
import background from '../../../assets/img/background.jpg'
import { MD } from '../../../utils/useWindowSize'

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media only screen and (max-width: ${`${MD}px`}) {
    justify-content: center;
  }
`

export const Card = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);

  @media only screen and (max-width: ${`${MD}px`}) {
    width: 90%;
    height: 40%;
    border-radius: 10px;
  }
`

export const Header = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 20px 7px 0px 7px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.blackCoffee};

  & p {
    font-weight: 500;
    margin-bottom: 13px;
  }

  @media only screen and (max-width: ${`${MD}px`}) {
    border-radius: 10px;
  }
`

export const Content = styled.div`
  flex: 1;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 8px;
    outline: transparent;
    border-radius: 6px;
    border: transparent;
    width: 80%;
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 20px;
    background: ${({ theme }) => theme.primary};

    p {
      margin: 0;
      font-weight: 500;
      color: ${({ theme }) => theme.textPrimary};
      margin: 0 auto;
    }

    :hover {
      background: ${({ theme }) => theme.blackCoffee};
      p {
        color: ${({ theme }) => theme.primary};
      }
    }

    img {
      width: 15%;
    }
  }
`

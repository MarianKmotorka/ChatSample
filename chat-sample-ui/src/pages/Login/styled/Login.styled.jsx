import styled from 'styled-components'
import background from '../../../img/background.jpg'

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const Card = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
`

export const Header = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 20px 7px 0px 7px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.blackCoffee};

  & p {
    font-weight: 500;
    margin-bottom: 13px;
  }
`

export const Content = styled.div`
  flex: 1;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    padding: 8px;
    outline: transparent;
    border-radius: 6px;
    border: transparent;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 20px;
    background: ${({ theme }) => theme.gold};

    & p {
      margin: 0;
      font-weight: 500;
      color: ${({ theme }) => theme.blackCoffee};
      margin: 0 auto;
    }

    &:hover {
      background: ${({ theme }) => theme.blackCoffee};
      p {
        color: ${({ theme }) => theme.gold};
      }
    }

    & img {
      width: 15%;
    }
  }
`

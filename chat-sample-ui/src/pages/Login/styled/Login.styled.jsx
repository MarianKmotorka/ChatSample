import styled from 'styled-components'
import background from '../../../img/background.jpg'

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const Card = styled.div`
  height: 50vh;
  width: 50%;
  max-width: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.05);
`

export const Header = styled.div`
  font-size: 30px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  padding: 20px 7px 0px 7px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.blackCoffee};
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
    width: 70%;
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
    }

    &:hover {
      background: ${({ theme }) => theme.blackCoffee};
      p {
        color: ${({ theme }) => theme.gold};
      }
    }

    & img {
      width: 15%;
      margin-right: 10px;
    }
  }
`

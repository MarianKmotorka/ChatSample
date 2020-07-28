import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.marigold};
  width: 100%;
  height: 55px;
  align-items: center;
  z-index: 5;
`

export const Logo = styled(Link)`
  font-size: 25px;
  padding: 10px 0 10px 30px;
  color: ${({ theme }) => theme.blackCoffee};

  :hover {
    color: ${({ theme }) => theme.blackCoffee};
  }
`

export const Links = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 30px;

  a {
    text-decoration: none;
    margin: 0 12px;
    font-size: 20px;
    color: ${({ theme }) => theme.blackCoffee};
    transition: transform 0.2s;
    &:hover {
      transform: translateY(5px);
    }
  }
`

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  border-radius: 30px;
  background: ${({ theme }) => theme.blackCoffee};
  p {
    color: ${({ theme }) => theme.white};
    padding-right: 13px;
    margin: 0;
  }

  img {
    border-radius: 50%;
    margin-right: 5px;
    height: 30px;
  }
`

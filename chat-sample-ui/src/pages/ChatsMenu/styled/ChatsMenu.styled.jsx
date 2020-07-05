import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Badge, Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.shadeWhite};
  padding: 30px 5px;
  max-height: 92vh;
  width: 20%;
  min-width: 140px;
  max-width: 200px;
  align-items: center;
  position: relative;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }
`

export const ChatButtonLink = styled(NavLink)`
  height: 100%;
  min-height: 55px;
  border-radius: 5px;
  background: ${({ theme }) => theme.lighGray};
  color: ${({ theme }) => theme.blackCoffee};
  text-decoration: none;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 300;

  & svg {
    color: ${({ theme }) => theme.blackCoffee};
    position: absolute;
    bottom: 1px;
    right: 1px;

    &:hover {
      color: ${({ theme }) => theme.red};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.blackCoffee};
  }

  &.active {
    font-weight: 500;
    color: ${({ theme }) => theme.red};
  }
`

export const StyledBadge = styled(Badge)`
  width: 90%;
  margin: 7px;
`

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
  transform: scale(1.2);
  transition: all 0.3s ease;
  border: none;
  position: sticky;
  top: 0px;
  z-index: 2;

  &:hover {
    transform: scale(1.3);
    color: ${({ theme }) => theme.red};
  }
`

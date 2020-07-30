import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Badge, Button } from 'antd'
import { MD } from '../../../utils/useWindowSize'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.shadeWhite};
  padding: 30px 0;
  max-height: calc(100vh - 55px);
  width: ${({ width }) => width || 'auto'};
  align-items: center;
`

export const ChatButtonLink = styled(NavLink)`
  height: 100%;
  min-height: 55px;
  background: ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.black};

  text-decoration: none;
  font-size: 18px;
  font-weight: 300;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: none;

  :hover {
    color: ${({ theme }) => theme.black};
  }

  &.active {
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.blue};
  }
`

export const StyledBadge = styled(Badge)`
  width: 100%;
  margin: 12px 7px;
  box-shadow: 7px 7px 5px 0px rgba(170, 170, 170, 1);
  transition: all 0.3s ease;

  :hover {
    transform: translateY(-8px);
    color: ${({ theme }) => theme.white};
    box-shadow: 9px 13px 5px 0px rgba(170, 170, 170, 1);
  }

  @media only screen and (max-width: ${`${MD}px`}) {
    margin: 8px 0 0 0;
    box-shadow: none;
    :hover {
      box-shadow: none;
      transform: none;
    }
  }
`

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
  transform: scale(1.2);
  transition: all 0.3s ease;
  border: none;
  top: 0px;

  :hover {
    transform: scale(1.3);
    color: ${({ theme }) => theme.red};
  }
`

export const ButtonsWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const ItemsWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ padding }) => padding || '0 25px 0 15px'};
  width: 100%;

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }

  @media only screen and (max-width: ${`${MD}px`}) {
    padding: 0 8px;
  }
`

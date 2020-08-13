import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Badge, Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.shadeWhite};
  padding: 30px 0;
  height: calc(100vh - 55px);
  min-width: 80px;
  align-items: center;
`

export const ChatButtonLink = styled(NavLink)`
  height: 100%;
  min-height: 55px;
  background: ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.black};
  padding: 5px;

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

  > p {
    word-break: break-word;
  }
`

export const StyledBadge = styled(Badge)`
  width: 100%;
  transition: all 0.3s ease;

  margin: ${({ expanded }) => (expanded ? '12px 7px' : '8px 0 0 0')};
  box-shadow: ${({ expanded }) =>
    expanded ? '7px 7px 5px 0px rgba(170, 170, 170, 1)' : 'none'};

  :hover {
    color: ${({ theme }) => theme.white};
    transform: ${({ expanded }) => (expanded ? 'translateY(-8px)' : 'none')};
    box-shadow: ${({ expanded }) =>
      expanded ? '9px 13px 5px 0px rgba(170, 170, 170, 1)' : 'none'};
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
  padding: ${({ expanded }) => (expanded ? '0 25px 0 15px' : '0 8px')};
  width: 100%;
`

export const AnimationClassesWrapper = styled.div`
  .wrapper--appear {
    width: ${({ expanded }) => (expanded ? '200px' : '80px')};
  }
  .wrapper--enter {
    width: 80px;
  }
  .wrapper--enter-active,
  .wrapper--enter-done {
    width: 200px;
    transition: width 400ms;
  }
  .wrapper--exit {
    width: 200px;
  }
  .wrapper--exit-active,
  .wrapper--exit-done {
    width: 80px;
    transition: width 400ms;
  }

  .dialog--enter form {
    transform: translateX(-50vw);
  }
  .dialog--enter-active form {
    transform: translateX(0);
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .dialog--exit form {
    transform: translateX(0);
  }
  .dialog--exit-active form {
    transform: translateX(50vw);
    transition: transform 500ms cubic-bezier(0.64, 0, 0.78, 0);
  }
`

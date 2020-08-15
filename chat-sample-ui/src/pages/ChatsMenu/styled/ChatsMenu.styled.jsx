import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Badge, Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg200};
  padding: 30px 0;
  height: calc(100vh - 55px);
  min-width: 80px;
  align-items: center;
  border-right: ${({ theme }) => theme.bg400} 0.5px solid;
  width: ${({ expanded }) => (expanded ? '300px' : '90px')};
`

export const ChatButtonLink = styled(NavLink)`
  height: 100%;
  min-height: 55px;
  background: ${({ theme }) => theme.bg100};
  color: ${({ theme }) => theme.textPrimary};

  text-decoration: none;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.bg300};
  }

  &.active {
    color: ${({ theme }) => theme.bg100};
    background: ${({ theme }) => theme.blue};
    p {
      font-weight: 500;
    }
  }

  > p {
    word-break: break-word;
  }
`

export const StyledBadge = styled(Badge)`
  min-width: 92%;
  transition: all 0.3s ease;

  :hover {
    color: ${({ theme }) => theme.bg100};
  }
`

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
  transform: scale(1.2);
  transition: all 0.3s ease;
  border: none;
  top: 0px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 15px;
  padding: 0 10px;
  > * {
    margin-top: 10px;
  }
`

export const AnimationClassesWrapper = styled.div`
  .wrapper--enter {
    width: 90px;
  }
  .wrapper--enter-active,
  .wrapper--enter-done {
    width: 300px;
    transition: width 400ms;
  }
  .wrapper--exit {
    width: 300px;
  }
  .wrapper--exit-active,
  .wrapper--exit-done {
    width: 90px;
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

import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Badge } from 'antd'
import Button from '../../../components/Button'

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
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 5px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.textPrimary};
    box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px) scale(1.03);

    ${({ theme }) =>
      theme.isDarkTheme &&
      css`
        background: ${({ theme }) => theme.bg300};
      `}
  }

  &.active {
    color: ${({ theme }) => theme.bg100};
    background: ${({ theme }) => theme.primary};
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

  .ant-badge-count {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.black};
    box-shadow: none;
  }
`

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
  transform: scale(1.2);
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

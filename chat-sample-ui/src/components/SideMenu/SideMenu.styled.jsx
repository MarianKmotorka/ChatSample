import styled from 'styled-components'
import colors from '../../utils/colors.json'
import { NavLink } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.mainDark};
  padding: 30px 5px;
  max-height: 92vh;
  width: 20%;
  min-width: 140px;
  max-width: 200px;
  align-items: center;
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
  width: 90%;
  min-height: 55px;
  border-radius: 5px;
  background: ${colors.ternary};
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: black;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & i {
    position: absolute;
    top: 5px;
    right: 8px;
    transition: color 0.2s;

    &:hover {
      color: ${colors.secondary};
    }
  }

  &.active {
    border: solid 2px ${colors.secondary};
  }
`

export const CreateChatButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background: ${colors.secondary};
  color: ${colors.mainDark};
  width: 40px;
  height: 40px;
  margin-top: 20px;
`

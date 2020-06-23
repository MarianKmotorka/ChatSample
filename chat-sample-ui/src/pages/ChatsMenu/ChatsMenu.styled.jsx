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
  background: radial-gradient(
    circle,
    ${colors.ternaryLight} 90%,
    ${colors.main} 100%
  );
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.main};
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 300;

  & i {
    position: absolute;
    top: 5px;
    right: 10px;
    color: ${colors.main};
    transition: color 0.1s;

    &:hover {
      color: ${colors.secondary};
    }
  }

  &.active {
    color: ${colors.secondary};
    font-weight: 500;
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
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.mainDark};
    color: ${colors.secondary};
    transform: scale(1.5);
  }
`

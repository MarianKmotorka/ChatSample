import styled from 'styled-components'
import { Button, Badge } from 'antd'
import ContextMenu from '../../ContextMenu'

export const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.shadeWhite};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  max-width: 300px;
`

export const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  & > p {
    margin-right: 10px;
    font-size: 18px;
    font-weight: 400;
  }
`

export const StyledMenu = styled(ContextMenu)`
  margin-left: auto;
`

export const StyledBadge = styled(Badge)`
  display: block;
  margin: 8px 13px 8px 0;
`

export const Photo = styled.img`
  border-radius: 50%;
  width: 35px;
`

export const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 25px;
  border-bottom: solid 1.5px ${({ theme }) => theme.red};
  margin: 15px 0;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;

  & i {
    cursor: pointer;
  }
`

export const Content = styled.div`
  overflow: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0 15px;
`

export const StyledButton = styled(Button)`
  margin: 5px 8px 15px 0px;
  transition: all 0.3s ease;
  border: none;
  position: sticky;
  top: 0px;
  z-index: 2;
  transform: scale(1.1);

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.red};
  }
`
export const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;

  & img {
    height: 28px;
    margin-right: 15px;
    border-radius: 50%;
  }
`

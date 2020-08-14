import styled from 'styled-components'
import { Button, Badge } from 'antd'
import ContextMenu from '../../ContextMenu'

export const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.shadeWhite};
  border-top: ${({ theme }) => theme.gray} 0.5px solid;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  width: ${({ width }) => width || 'auto'};
  height: 100%;

  position: ${({ renderOver }) => (renderOver ? 'absolute' : 'static')};
  top: 0px;
  right: 0px;
`

export const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  width: 100%;

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

export const Text = styled.p`
  color: ${({ theme }) => theme.black};
`

export const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 25px;
  border-bottom: solid 1.5px ${({ theme }) => theme.black};
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
  width: 100%;
  margin: 0;
  padding: 0 15px;
`

export const StyledButton = styled(Button)`
  margin: 5px 8px 15px 0px;
  position: sticky;
  top: 0px;
  z-index: 2;
  transform: scale(1.1);
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

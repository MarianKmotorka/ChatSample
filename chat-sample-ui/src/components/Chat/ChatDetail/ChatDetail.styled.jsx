import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.shadeWhite};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
`

export const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  & p {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }

  & i {
    width: 20px;
    height: 20px;
    padding-top: 3px;
    text-align: center;
    border-radius: 50%;
    margin-left: auto;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      color: ${({ theme }) => theme.red};
      transform: scale(1.3);
    }
  }
`

export const Photo = styled.img`
  border-radius: 50%;
  width: 35px;
  margin: 8px 10px 8px 0;
  display: block;
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

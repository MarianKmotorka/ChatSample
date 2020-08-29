import styled from 'styled-components'
import { Button } from 'antd'
import { SM } from '../../../utils/useWindowSize'

export const Wrapper = styled.div`
  width: 60%;
  height: 80%;
  padding: 15px;
  background: ${({ theme }) => (theme.isDarkTheme ? theme.lightGray : theme.bg200)};
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: ${`${SM}px`}) {
    width: 90%;
  }
`

export const Photo = styled.img`
  height: 100%;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.white};
  position: absolute;
  top: 50%;
`

export const Hero = styled.div`
  height: 30%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  background: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`

export const BottomHero = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 0 0 40px 40px;
  background: ${({ theme }) => theme.bg300};
  padding: 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledButton = styled(Button)`
  transform: scale(1.5);
  position: absolute;
  right: 30px;
  top: 30px;
`

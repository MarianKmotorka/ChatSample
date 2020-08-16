import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  padding: 30px;
  background: ${({ theme }) => (theme.isDarkTheme ? theme.lightGray : theme.bg200)};
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

export const Photo = styled.img`
  width: 40%;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.white};
  min-width: 150px;
  max-width: 250px;
  position: absolute;
  top: 15%;
`

export const Hero = styled.div`
  height: 30%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  background: ${({ theme }) => theme.primary};
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

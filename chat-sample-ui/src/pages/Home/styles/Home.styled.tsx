import styled from 'styled-components'
import { XS, SM } from '../../../utils/useWindowSize'
import office from '../../../assets/img/office.jpg'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${office});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const Banner = styled.div`
  height: 60%;
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg200};
  border-radius: 30px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.4);

  @media only screen and (max-width: ${`${SM}px`}) {
    width: 90%;
  }
`

export const HugeText = styled.p`
  font-size: 4rem;
  color: ${({ theme, color }) => theme[color || 'white']};
  margin: 0;

  @media only screen and (max-width: ${`${XS}px`}) {
    font-size: 2.5em;
  }
`

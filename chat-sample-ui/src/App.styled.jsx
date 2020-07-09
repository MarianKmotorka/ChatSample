import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const AppWrapper = styled.div`
  height: 100%;
`

export const MenuAndContentWrapper = styled.div`
  display: flex;
`

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 92vh;
`
export const GlobalStyle = createGlobalStyle`
  p {
    margin:0;
  }
`

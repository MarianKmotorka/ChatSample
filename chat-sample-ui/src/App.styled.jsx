import styled, { createGlobalStyle } from 'styled-components'

export const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const MenuAndContentWrapper = styled.div`
  display: flex;
  flex: 1;
`

export const ContentWrapper = styled.div`
  flex: 1;
  height: calc(100vh - 55px);
`

export const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }
}

 html,
 body,
 body > div {
   height: 100vh;
   overflow: hidden;
 }

  p, h1, h2, h3, h4, h5, h6 {
    margin:0;
  }
`

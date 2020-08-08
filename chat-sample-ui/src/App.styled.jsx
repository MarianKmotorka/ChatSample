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
   height: 100%;
   overflow: hidden;
 }

 code {
   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
     monospace;
  }

  p {
    margin:0;
  }
`

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

.wordwrap {
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
}

  p {
    margin:0;
  }
`

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InnerWrapper = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 55px - 60px); /* 100vh - Navbar - TopBar */
`

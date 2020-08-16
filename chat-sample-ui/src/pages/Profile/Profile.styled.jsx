import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  padding: 30px;
  background: ${({ theme }) => (theme.isDarkTheme ? theme.lightGray : theme.bg200)};
  border-radius: 40px;
`

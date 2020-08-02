import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const TopBar = styled.div`
  height: 60px;
  width: 100%;
  background: ${({ theme }) => theme.shadeWhite};
`

export const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`

import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  background: ${({ theme }) => theme.shadeWhite};
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  border-left: ${({ theme }) => theme.gray} 0.5px solid;
`

export const ChatName = styled.h2`
  color: ${({ theme }) => theme.blackCoffee};
  flex: 1;
`

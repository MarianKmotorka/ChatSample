import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`

const Name = styled.p`
  color: ${({ theme }) => theme.primary};
  width: ${({ width }) => `${width}px`};
  font-size: 18px;

  ::after {
    content: ':';
  }
`

const Value = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18px;
`

const NameValueRow = ({ children, name, nameWidth }) => {
  return (
    <Wrapper>
      <Name width={nameWidth}>{name}</Name>
      <Value>{children}</Value>
    </Wrapper>
  )
}

export default NameValueRow

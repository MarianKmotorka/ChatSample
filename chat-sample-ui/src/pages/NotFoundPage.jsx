import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 30px;
  padding: 10px 20px;
`

const NotFoundPage = ({ location }) => {
  if (location.pathname.endsWith('profile')) return null

  return <Wrapper>Not Found 404</Wrapper>
}

export default NotFoundPage

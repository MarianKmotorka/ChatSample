import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 30px;
  padding: 10px 20px;
`

interface FixMeLater {
  location: any
}

const NotFoundPage: React.FC<FixMeLater> = ({ location }) => {
  if (location.pathname.endsWith('profile')) return null

  return <Wrapper>Not Found 404</Wrapper>
}

export default NotFoundPage

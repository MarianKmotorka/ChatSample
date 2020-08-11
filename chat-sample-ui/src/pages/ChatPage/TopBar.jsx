import React from 'react'
import { Wrapper } from './styled/TopBar.styled'

const TopBar = ({ chatName }) => {
  return <Wrapper>{chatName}</Wrapper>
}

export default TopBar

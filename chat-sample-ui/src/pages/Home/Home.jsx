import React from 'react'
import { Wrapper, Banner, HugeText } from './styled/Home.styled'

const Home = () => {
  return (
    <Wrapper>
      <Banner>
        <HugeText color='marigold'>Welcome</HugeText>
        <HugeText>to the</HugeText>
        <HugeText color='red'>chat</HugeText>
      </Banner>
    </Wrapper>
  )
}

export default Home

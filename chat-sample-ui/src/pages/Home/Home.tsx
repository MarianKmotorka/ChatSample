import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { Wrapper, Banner, HugeText } from './styles/Home.styled'
import './styles/Home.animations.css'

const Home = () => {
  return (
    <Wrapper>
      <CSSTransition appear in timeout={1000} classNames='banner-'>
        <Banner>
          <HugeText color='primary'>Welcome</HugeText>
          <HugeText color='text'>to the</HugeText>
          <HugeText color='red'>chat</HugeText>
        </Banner>
      </CSSTransition>
    </Wrapper>
  )
}

export default Home

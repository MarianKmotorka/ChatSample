import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../services/authService'
import { Wrapper, Logo, Links } from './Navbar.styled'

const Navbar = () => {
  return (
    <Wrapper>
      <Logo>SampleChat</Logo>
      <Links>
        {!isLoggedIn && <Link to='/login'>Login</Link>}
        {isLoggedIn && <Link to='/logout'>Logout</Link>}
      </Links>
    </Wrapper>
  )
}

export default Navbar

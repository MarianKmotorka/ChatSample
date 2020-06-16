import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../utils/colors.json'
import { isLoggedIn } from '../../services/authService'

const Wrapper = styled.div`
  display: flex;
  background: ${colors.main};
  width: 100%;
  height: 8vh;
  align-items: center;
`

const Logo = styled.div`
  font-size: 25px;
  flex: 3;
  padding: 10px 0 10px 30px;
`

const Links = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;

  & a {
    text-decoration: none;
    margin: 0 12px;
    font-size: 20px;
    color: ${colors.secondaryDark};
    transition: transform 0.2s;
    &:hover {
      transform: translateY(5px);
    }
  }
`

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

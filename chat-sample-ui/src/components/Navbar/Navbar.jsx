import React, { useContext } from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../services/authService'
import { Wrapper, Logo, Links, ProfileWrapper } from './Navbar.styled'
import { ProfileContext } from '../../contextProviders/ProfileContextProvider'

const Navbar = () => {
  const { profile } = useContext(ProfileContext)

  return (
    <Wrapper>
      <Logo>SampleChat</Logo>
      <Links>
        {!isLoggedIn && <Link to='/login'>Login</Link>}
        {isLoggedIn && (
          <>
            <ProfileWrapper>
              <img src={get(profile, 'picture')} alt='user' />
              <p>{get(profile, 'name')}</p>
            </ProfileWrapper>
            <Link to='/logout'>Logout</Link>
          </>
        )}
      </Links>
    </Wrapper>
  )
}

export default Navbar

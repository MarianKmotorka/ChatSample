import React, { useContext, useState } from 'react'
import { get } from 'lodash'

import { isLoggedIn } from '../../services/authService'
import { ProfileContext } from '../../contextProviders/ProfileContextProvider'
import useWindowSize, { SM } from '../../utils/useWindowSize'

import {
  Wrapper,
  Logo,
  Links,
  ProfileWrapper,
  Avatar,
  UserName,
  NavbarLink,
  ExpandedLinksWrapper,
  ExpandedMenuLink
} from './Navbar.styled'

const Navbar = () => {
  const { profile } = useContext(ProfileContext)
  const { width } = useWindowSize()
  const [linksExpanded, setLinksExpanded] = useState(false)

  const links = (
    <Links>
      <ProfileWrapper>
        <Avatar referrerPolicy='no-referrer' src={get(profile, 'picture')} />
        <UserName>{get(profile, 'name')}</UserName>
      </ProfileWrapper>
      <NavbarLink to='/logout'>Logout</NavbarLink>
    </Links>
  )

  const smallScreenLinks = (
    <>
      <Avatar
        onClick={() => setLinksExpanded(prev => !prev)}
        referrerPolicy='no-referrer'
        src={get(profile, 'picture')}
        marginRight='20px'
      />
      {linksExpanded && (
        <ExpandedLinksWrapper>
          <ExpandedMenuLink to='/logout'>Logout</ExpandedMenuLink>
        </ExpandedLinksWrapper>
      )}
    </>
  )

  return (
    <Wrapper>
      <Logo to='/'>SampleChat</Logo>
      {isLoggedIn && (width < SM ? smallScreenLinks : links)}
    </Wrapper>
  )
}

export default Navbar

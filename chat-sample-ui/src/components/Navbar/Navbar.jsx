import React, { useContext, useState } from 'react'
import { get, trimEnd } from 'lodash'
import { useHistory } from 'react-router-dom'
import { BgColorsOutlined } from '@ant-design/icons'

import { isLoggedIn } from '../../services/authService'
import { ProfileContext, ThemeContext } from '../../contextProviders'
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
  ExpandedMenuLink,
  ThemeButton
} from './Navbar.styled'

const Navbar = () => {
  const { profile } = useContext(ProfileContext)
  const { toggleTheme } = useContext(ThemeContext)
  const { width } = useWindowSize()
  const history = useHistory()
  const [linksExpanded, setLinksExpanded] = useState(false)

  const getProfilePath = () => trimEnd(history.location.pathname, '/') + '/profile'

  const links = (
    <Links>
      <ProfileWrapper onClick={() => history.push(getProfilePath())}>
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
          <ExpandedMenuLink to={getProfilePath()}>Profile</ExpandedMenuLink>
        </ExpandedLinksWrapper>
      )}
    </>
  )

  return (
    <Wrapper>
      <Logo to='/'>SampleChat</Logo>
      <ThemeButton
        icon={<BgColorsOutlined />}
        type='text'
        shape='circle'
        onClick={toggleTheme}
      />
      {isLoggedIn && (width < SM ? smallScreenLinks : links)}
    </Wrapper>
  )
}

export default Navbar

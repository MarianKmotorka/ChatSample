import React, { useRef, useContext } from 'react'

import { ProfileContext } from '../../contextProviders'
import { PortalBackdrop } from '../../components/Backdrop'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { NameValueRow, NameValueRowsContainer } from '../../components/NameValue'

import { Wrapper, Photo, Hero, BottomHero } from './Profile.styled'

const Profile = ({ history }) => {
  const wrapperRef = useRef()
  useOnClickOutside(wrapperRef, () => history.goBack())
  const { profile } = useContext(ProfileContext)

  return (
    <PortalBackdrop>
      <Wrapper ref={wrapperRef}>
        <Hero />

        <Photo src={profile?.picture} referrerPolicy='no-referrer' />

        <BottomHero>
          <NameValueRowsContainer nameWidth={70}>
            <NameValueRow name='Name'>{profile?.name}</NameValueRow>
            <NameValueRow name='Email'>{profile?.email}</NameValueRow>
          </NameValueRowsContainer>
        </BottomHero>
      </Wrapper>
    </PortalBackdrop>
  )
}

export default Profile

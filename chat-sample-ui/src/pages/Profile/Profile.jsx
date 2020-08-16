import React, { useRef, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CloseOutlined } from '@ant-design/icons'

import { ProfileContext } from '../../contextProviders'
import { PortalBackdrop } from '../../components/Backdrop'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { NameValueRow, NameValueRowsContainer } from '../../components/NameValue'

import { Wrapper, Photo, Hero, BottomHero, StyledButton } from './styles/Profile.styled'
import './styles/Profile.animations.css'

const Profile = ({ history }) => {
  const wrapperRef = useRef()
  useOnClickOutside(wrapperRef, history.goBack)
  const { profile } = useContext(ProfileContext)

  return (
    <PortalBackdrop>
      <CSSTransition timeout={400} classNames='profile-' appear in>
        <Wrapper ref={wrapperRef}>
          <Hero>
            <Photo src={profile?.picture} referrerPolicy='no-referrer' />
            <StyledButton
              icon={<CloseOutlined />}
              type='text'
              shape='circle'
              onClick={history.goBack}
            />
          </Hero>

          <BottomHero>
            <NameValueRowsContainer nameWidth={70}>
              <NameValueRow name='Name'>{profile?.name}</NameValueRow>
              <NameValueRow name='Email'>{profile?.email}</NameValueRow>
            </NameValueRowsContainer>
          </BottomHero>
        </Wrapper>
      </CSSTransition>
    </PortalBackdrop>
  )
}

export default Profile

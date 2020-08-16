import React, { useRef } from 'react'

import { PortalBackdrop } from '../../components/Backdrop'
import useOnClickOutside from '../../utils/useOnClickOutside'

import { Wrapper } from './Profile.styled'

const Profile = ({ history }) => {
  const wrapperRef = useRef()
  useOnClickOutside(wrapperRef, () => history.goBack())

  return (
    <PortalBackdrop>
      <Wrapper ref={wrapperRef}>PROFILE</Wrapper>
    </PortalBackdrop>
  )
}

export default Profile

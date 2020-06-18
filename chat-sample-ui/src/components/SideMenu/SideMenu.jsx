import React from 'react'
import { Wrapper, RoomButton } from './SideMenu.styled'
import { isLoggedIn } from '../../services/authService'

const SideMenu = () => {
  if (!isLoggedIn) return null

  return (
    <Wrapper>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
    </Wrapper>
  )
}

export default SideMenu

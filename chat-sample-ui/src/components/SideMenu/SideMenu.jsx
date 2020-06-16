import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors.json'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../services/authService'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.mainDark};
  padding: 30px 5px;
  max-height: 92vh;
  width: 20%;
  min-width: 140px;
  max-width: 200px;
  align-items: center;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }
`

const RoomButton = styled(Link)`
  width: 90%;
  min-height: 55px;
  border-radius: 5px;
  background: ${colors.ternary};
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: black;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SideMenu = () => {
  if (!isLoggedIn) return null

  return (
    <Wrapper>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
      <RoomButton>Room1</RoomButton>
    </Wrapper>
  )
}

export default SideMenu

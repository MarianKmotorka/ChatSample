import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SideMenu from './components/SideMenu/SideMenu'
import styled from 'styled-components'

const NavAndBelow = styled.div`
  height: 100%;
`

const MenuAndContent = styled.div`
  display: flex;
`

const Content = styled.div`
  flex: 1;
  width: 100%;
  height: 92vh;
  background: grey;
`

const App = () => {
  return (
    <NavAndBelow>
      <Navbar />
      <MenuAndContent>
        <SideMenu />
        <Content />
      </MenuAndContent>
    </NavAndBelow>
  )
}

export default App

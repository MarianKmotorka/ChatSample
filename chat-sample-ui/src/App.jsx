import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SideMenu from './components/SideMenu/SideMenu'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Chat from './pages/Chat/Chat'
import LoginPage from './pages/Login/Login'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'

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
  background: linear-gradient(45deg, #c1dfc4, #deecdd);
`

const App = () => {
  return (
    <NavAndBelow>
      <Navbar />
      <MenuAndContent>
        <SideMenu />
        <Content>
          <Switch>
            <ProtectedRoute path='/chat' component={Chat} />
            <Route
              path='/google-login-callback'
              component={GoogleLoginCallback}
            />
            <Route path='/login' component={LoginPage} />
            <Route path='/' render={() => 'NOT FOUND'} />
          </Switch>
        </Content>
      </MenuAndContent>
    </NavAndBelow>
  )
}

export default App

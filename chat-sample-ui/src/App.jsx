import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideMenu from './components/SideMenu/SideMenu'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Chat from './pages/Chat/Chat'
import LoginPage from './pages/Login/Login'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'
import Logout from './pages/Logout'
import { AppWrapper, MenuAndContentWrapper, ContentWrapper } from './App.styled'

const App = () => {
  return (
    <AppWrapper>
      <Navbar />
      <MenuAndContentWrapper>
        <SideMenu />
        <ContentWrapper>
          <Switch>
            <ProtectedRoute path='/' exact component={Chat} />
            <Route
              path='/google-login-callback'
              component={GoogleLoginCallback}
            />
            <Route path='/login' component={LoginPage} />
            <Route path='/logout' component={Logout} />
            <Route path='/' render={() => 'NOT FOUND'} />
          </Switch>
        </ContentWrapper>
      </MenuAndContentWrapper>
    </AppWrapper>
  )
}

export default App

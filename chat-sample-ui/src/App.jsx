import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideMenu from './components/SideMenu/SideMenu'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/Login/Login'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'
import Logout from './pages/Logout'
import { AppWrapper, MenuAndContentWrapper, ContentWrapper } from './App.styled'
import Room from './pages/Room/Room'
import ProfileContextProvider from './contextProviders/ProfileContextProvider'
import { isLoggedIn } from './services/authService'

const App = () => {
  return (
    <ProfileContextProvider>
      <AppWrapper>
        <Navbar />
        <MenuAndContentWrapper>
          {isLoggedIn && <SideMenu />}
          <ContentWrapper>
            <Switch>
              <ProtectedRoute path='/chats/:id' exact component={Room} />
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
    </ProfileContextProvider>
  )
}

export default App

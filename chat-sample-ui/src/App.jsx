import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import ChatsMenu from './pages/ChatsMenu/ChatsMenu'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/Login/Login'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'
import Logout from './pages/Logout'
import ChatPage from './pages/ChatPage/ChatPage'
import ProfileContextProvider from './contextProviders/ProfileContextProvider'
import ChatContextProvider from './contextProviders/ChatContextProvider'
import { isLoggedIn } from './services/authService'

import {
  AppWrapper,
  MenuAndContentWrapper,
  ContentWrapper,
  GlobalStyle
} from './App.styled'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ProfileContextProvider>
        <ChatContextProvider>
          <AppWrapper>
            <Navbar />
            <MenuAndContentWrapper>
              {isLoggedIn && <ChatsMenu />}
              <ContentWrapper>
                <Switch>
                  <ProtectedRoute path='/' exact component={Home} />
                  <ProtectedRoute
                    path='/chats/:chatId'
                    exact
                    component={ChatPage}
                  />
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
        </ChatContextProvider>
      </ProfileContextProvider>
    </>
  )
}

export default App

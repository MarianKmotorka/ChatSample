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

import { AppWrapper, MenuAndContentWrapper, ContentWrapper } from './App.styled'

const App = () => {
  return (
    <ProfileContextProvider>
      <ChatContextProvider>
        <AppWrapper>
          <Navbar />
          <MenuAndContentWrapper>
            {isLoggedIn && <ChatsMenu />}
            <ContentWrapper>
              <Switch>
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
  )
}

export default App

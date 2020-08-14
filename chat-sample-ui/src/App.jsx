import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Logout from './pages/Logout'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import ChatPage from './pages/ChatPage/ChatPage'
import { isLoggedIn } from './services/authService'
import ChatsMenu from './pages/ChatsMenu/ChatsMenu'
import ProtectedRoute from './components/ProtectedRoute'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'
import GlobalContextProvider from './contextProviders/GlobalContextProvider'

import {
  AppWrapper,
  MenuAndContentWrapper,
  ContentWrapper,
  GlobalStyle
} from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyle />

      <GlobalContextProvider>
        <AppWrapper>
          <Navbar />
          <MenuAndContentWrapper>
            {isLoggedIn && <ChatsMenu />}
            <ContentWrapper>
              <Switch>
                <ProtectedRoute path='/' exact component={Home} />
                <ProtectedRoute path='/chats/:chatId' exact component={ChatPage} />
                <Route path='/google-login-callback' component={GoogleLoginCallback} />
                <Route path='/login' component={LoginPage} />
                <Route path='/logout' component={Logout} />
                <Route path='/' render={() => 'NOT FOUND'} />
              </Switch>
            </ContentWrapper>
          </MenuAndContentWrapper>
        </AppWrapper>
      </GlobalContextProvider>
    </>
  )
}

export default App

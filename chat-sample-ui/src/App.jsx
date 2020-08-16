import React from 'react'

import Routes from './Routes'
import Navbar from './components/Navbar/Navbar'
import { isLoggedIn } from './services/authService'
import ChatsMenu from './pages/ChatsMenu/ChatsMenu'
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
              <Routes />
            </ContentWrapper>
          </MenuAndContentWrapper>
        </AppWrapper>
      </GlobalContextProvider>
    </>
  )
}

export default App

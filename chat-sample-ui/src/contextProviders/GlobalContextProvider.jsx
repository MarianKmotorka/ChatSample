import React from 'react'
import ChatContextProvider from './ChatContextProvider'
import ProfileContextProvider from './ProfileContextProvider'
import ThemeContextProvider from './ThemeContextProvider'

const GlobalContextProvider = ({ children }) => (
  <ThemeContextProvider>
    <ProfileContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </ProfileContextProvider>
  </ThemeContextProvider>
)

export default GlobalContextProvider

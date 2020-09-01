import React from 'react'
import ChatContextProvider from './ChatContextProvider'
import ProfileContextProvider from './ProfileContextProvider'
import ThemeContextProvider from './ThemeContextProvider'

const GlobalContextProvider: React.FC = ({ children }) => (
  <ThemeContextProvider>
    <ProfileContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </ProfileContextProvider>
  </ThemeContextProvider>
)

export default GlobalContextProvider

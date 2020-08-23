import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { invert } from 'lodash'
import { lightTheme, darkTheme } from '../utils/theme.ts'

export const ThemeContext = createContext()
export const ThemeEnum = {
  Dark: 0,
  Light: 1
}

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(ThemeEnum.Light)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) setTheme(ThemeEnum[storedTheme])
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light
    setTheme(nextTheme)
    localStorage.setItem('theme', invert(ThemeEnum)[nextTheme])
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StyledComponentsThemeProvider
        theme={theme === ThemeEnum.Light ? lightTheme : darkTheme}
      >
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider

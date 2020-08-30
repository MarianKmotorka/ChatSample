import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'

interface IContext {
  toggleTheme: () => void
  pickColor: (color: string) => void
}

export const ThemeContext = createContext<IContext>(null!)

export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light'
}

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(ThemeEnum.Light)
  const [primaryColor, setPrimaryColor] = useState(lightTheme.green)

  useEffect(() => {
    const storedTheme =
      localStorage.getItem('theme') === 'dark' ? ThemeEnum.Dark : ThemeEnum.Light // Note: Find better way to parse to enum

    setTheme(storedTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme.toString())
  }

  const pickColor = (color: string) => {
    setPrimaryColor(color)
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, pickColor }}>
      <StyledComponentsThemeProvider
        theme={
          theme === ThemeEnum.Light
            ? { ...lightTheme, primary: primaryColor }
            : { ...darkTheme, primary: primaryColor }
        }
      >
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider

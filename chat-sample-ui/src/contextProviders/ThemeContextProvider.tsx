import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'

interface IContext {
  toggleTheme: () => void
  pickColor: (color: string) => void
}

export const ThemeContext = createContext<IContext>(null!)
export type Theme = 'light' | 'dark'

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>()
  const [primaryColor, setPrimaryColor] = useState<string>(null!)

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'dark')
    setPrimaryColor(localStorage.getItem('color') || lightTheme.orange)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  const pickColor = (color: string) => {
    setPrimaryColor(color)
    localStorage.setItem('color', color)
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, pickColor }}>
      <StyledComponentsThemeProvider
        theme={
          theme === 'light'
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

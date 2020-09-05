import React, { createContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, colors } from '../utils/theme'

interface IContext {
  toggleTheme: () => void
  pickColor: (color: string) => void
}

export const ThemeContext = createContext<IContext>(null!)
export type Theme = 'light' | 'dark'

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>()
  const [primaryColor, setPrimaryColor] = useState<string>(null!)
  const [textPrimaryColor, setTextPrimaryColor] = useState<string>(lightTheme.textPrimary)

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'dark')
    setPrimaryColor(localStorage.getItem('color') || colors.orange)
  }, [])

  // Adjust Theme.textPrimary for selected primaryColor
  useEffect(() => {
    if ([colors.blue, colors.green, colors.red].includes(primaryColor))
      setTextPrimaryColor(colors.white)
    else {
      setTextPrimaryColor(colors.black)
    }
  }, [primaryColor])

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
            ? { ...lightTheme, primary: primaryColor, textPrimary: textPrimaryColor }
            : { ...darkTheme, primary: primaryColor, textPrimary: textPrimaryColor }
        }
      >
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider

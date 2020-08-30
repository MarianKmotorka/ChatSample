import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    bg100: string
    bg200: string
    bg300: string
    bg400: string
    bg500: string
    textPrimary: string
    primary: string

    blue: string
    red: string
    green: string
    black: string
    white: string
    blackCoffee: string
    gray: string
    lightGray: string
    darkGray: string
    transparent: string

    isDarkTheme: boolean
    [key: string]: any
  }
}

export const lightTheme: DefaultTheme = {
  bg100: '#fafafa',
  bg200: '#efefef',
  bg300: '#e4e3e5',
  bg400: '#BFBDC1',
  bg500: '#7d7d7d',
  textPrimary: '#000000',
  primary: '#a0a734',

  blue: '#298cfb',
  red: '#ff4d4f',
  green: '#a0a734',
  black: '#010101',
  white: '#ffffff',
  blackCoffee: '#37323E',
  gray: '#424242',
  lightGray: '#ceced9',
  darkGray: '#242526',
  transparent: 'transparent',

  isDarkTheme: false
}

export const darkTheme: DefaultTheme = {
  bg100: '#18191a',
  bg200: '#242526',
  bg300: '#3a3c3d',
  bg400: '#404041',
  bg500: '#acacb7',
  textPrimary: '#ffffff',
  primary: '#a0a734',

  blue: '#298cfb',
  red: '#ff4d4f',
  green: '#a0a734',
  black: '#010101',
  white: '#ffffff',
  blackCoffee: '#37323E',
  gray: '#424242',
  lightGray: '#ceced9',
  darkGray: '#242526',
  transparent: 'transparent',

  isDarkTheme: true
}

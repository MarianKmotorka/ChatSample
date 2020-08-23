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

    isDarkTheme: boolean
  }
}

export const lightTheme: DefaultTheme = {
  bg100: '#fafafa',
  bg200: '#efefef',
  bg300: '#e4e3e5',
  bg400: '#BFBDC1',
  bg500: '#7d7d7d',
  textPrimary: '#000000',
  primary: '#DE9E36',

  blue: '#298cfb',
  red: '#ff4d4f',
  green: '#057a5e',
  black: '#010101',
  white: '#ffffff',
  blackCoffee: '#37323E',
  gray: '#424242',
  lightGray: '#ceced9',

  isDarkTheme: false
}

export const darkTheme: DefaultTheme = {
  bg100: '#18191a',
  bg200: '#242526',
  bg300: '#3a3c3d',
  bg400: '#404041',
  bg500: '#acacb7',
  textPrimary: '#ffffff',
  primary: '#298cfb',

  blue: '#298cfb',
  red: '#ff4d4f',
  green: '#057a5e',
  black: '#010101',
  white: '#ffffff',
  blackCoffee: '#37323E',
  gray: '#424242',
  lightGray: '#ceced9',

  isDarkTheme: true
}

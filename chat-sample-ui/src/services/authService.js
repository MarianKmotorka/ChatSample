import { isNil, set, get } from 'lodash'

export const login = token => localStorage.setItem('token', token)

export const logout = () => localStorage.removeItem('appUser')

export const getToken = () => localStorage.getItem('token') || null

export const isLoggedIn = getToken()

export const setCurrentUser = user =>
  localStorage.setItem('appUser', JSON.stringify(user))

export const getCurrentUser = () => {
  if (isNil(localStorage.getItem('appUser'))) return null
  return JSON.parse(localStorage.getItem('appUser'))
}

export const getJwt = () => get(getCurrentUser(), 'jwt')
export const getRefreshToken = () => get(getCurrentUser(), 'refreshToken')

export const setJwtAndRefreshToken = ({ jwt, refreshToken }) => {
  let currUser = getCurrentUser()
  set(currUser, 'jwt', jwt)
  set(currUser, 'refreshToken', refreshToken)

  setCurrentUser(currUser)
}

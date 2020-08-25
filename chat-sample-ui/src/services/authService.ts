const JWT = 'jwt'
const REFRESH_TOKEN = 'refresh_token'

type FixMeLater = any

export const login = (loginResponse: FixMeLater) => {
  localStorage.setItem(JWT, loginResponse.jwt)
  localStorage.setItem(REFRESH_TOKEN, loginResponse.refreshToken)
}

export const logout = () => {
  localStorage.removeItem(JWT)
  localStorage.removeItem(REFRESH_TOKEN)
}

export const getJwt = (): string => localStorage.getItem(JWT) || ''
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN)

export const isLoggedIn = !!getJwt()

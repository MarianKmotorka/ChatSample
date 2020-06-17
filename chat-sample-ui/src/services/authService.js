const JWT = 'jwt'
const REFRESH_TOKEN = 'refresh_token'

export const login = loginResponse => {
  localStorage.setItem(JWT, loginResponse.jwt)
  localStorage.setItem(REFRESH_TOKEN, loginResponse.refreshToken)
}

export const logout = () => {
  localStorage.removeItem(JWT)
  localStorage.removeItem(REFRESH_TOKEN)
}

export const getJwt = () => localStorage.getItem(JWT)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN)

export const isLoggedIn = !!getJwt()

import axios from 'axios'
import { get } from 'lodash'
import { login, getJwt, getRefreshToken, logout } from './authService'
import { API_URL_DEV, API_URL_PROD } from '../utils/config.json'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? API_URL_PROD : API_URL_DEV

axios.interceptors.request.use(
  request => {
    request.headers['Authorization'] = 'Bearer ' + getJwt()
    return request
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = get(error, 'config')

    if (get(error, 'response.status') === 401) {
      try {
        const response = await axios.post('/auth/refresh-token', {
          expiredJwt: getJwt(),
          refreshToken: getRefreshToken()
        })

        login(get(response, 'data'))
        return axios(originalRequest)
      } catch (_) {
        logout()
        window.location = '/login'
      }
    } else return Promise.reject(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}

import axios from 'axios'
import { get } from 'lodash'
import { login, getJwt, getRefreshToken, logout } from './authService'
import { API_URL } from '../utils/config.json'

axios.defaults.baseURL = API_URL

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
  delete: axios.delete
}

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
    const originalRequest = error.config

    if (error.response.status === 401) {
      const response = await axios.post('/auth/refresh-token', {
        expiredJwt: getJwt(),
        refreshToken: getRefreshToken()
      })

      if (get(response, 'status') === 200) {
        login(get(response, 'data'))
        return axios(originalRequest)
      } else {
        logout()
        window.location = '/login'
      }
    }
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

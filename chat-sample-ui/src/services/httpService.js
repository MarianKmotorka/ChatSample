import axios from 'axios'
import { get } from 'lodash'
import { setJwtAndRefreshToken, getJwt, getRefreshToken } from './authService'
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const response = await axios.post('/appUsers/refresh', {
        expiredJwt: getJwt(),
        refreshToken: getRefreshToken()
      })

      if (get(response, 'status') === 200) {
        setJwtAndRefreshToken(get(response, 'data'))
        return axios(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

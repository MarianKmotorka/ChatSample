import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import config from '../../utils/config.json'
import { login } from '../../services/authService'
import api from '../../services/httpService'

const GoogleLoginCallback = () => {
  const { search } = useLocation()
  const history = useHistory()
  const { code } = queryString.parse(search)

  useEffect(() => {
    const sendCodeToServer = async () => {
      const response = await api.get(
        `${config.SERVER_AUTH_CALLBACK_URL}?code=${code}`
      )

      login(response.data)

      window.location = '/'
    }
    sendCodeToServer()
  }, [code, history])

  return <div>Authenticating...</div>
}

export default GoogleLoginCallback

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import config from '../../utils/config.json'
import { login } from '../../services/authService'
import api from '../../services/httpService'

const GoogleLoginCallback = () => {
  const { search } = useLocation()
  const { code } = queryString.parse(search)

  useEffect(() => {
    const sendCodeToServer = async () => {
      const response = await api.get(`${config.SERVER_AUTH_CALLBACK_URL}?code=${code}`)
      login(response.data)
      window.location = '/'
    }

    sendCodeToServer()
  }, [code])

  return <div>Authenticating...</div>
}

export default GoogleLoginCallback

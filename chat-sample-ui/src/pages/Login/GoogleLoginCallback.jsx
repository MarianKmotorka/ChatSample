import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import styled from 'styled-components'

import config from '../../utils/config.json'
import { login } from '../../services/authService'
import api from '../../services/httpService'

const Text = styled.p`
  color: ${({ theme }) => theme.text};
  padding: 20px;
  font-size: 16px;
`

const GoogleLoginCallback = () => {
  const { search } = useLocation()
  const { code, state: returnUrl } = queryString.parse(search)

  useEffect(() => {
    const sendCodeToServer = async () => {
      const response = await api.get(`${config.SERVER_AUTH_CALLBACK_URL}?code=${code}`)
      login(response.data)
      window.location = returnUrl || '/'
    }

    sendCodeToServer()
  }, [code, returnUrl])

  return <Text>Authenticating...</Text>
}

export default GoogleLoginCallback

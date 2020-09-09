import React, { useEffect, useState } from 'react'
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

const Pre = styled.pre`
  color: ${({ theme }) => theme.text};
  padding: 20px;
  font-size: 16px;
`

const GoogleLoginCallback = () => {
  const [error, setError] = useState()
  const { search } = useLocation()
  const { code, state: returnUrl } = queryString.parse(search)

  useEffect(() => {
    const sendCodeToServer = async () => {
      try {
        const response = await api.get(`${config.SERVER_AUTH_CALLBACK_URL}?code=${code}`)
        login(response.data)
        window.location = returnUrl || '/'
      } catch (err) {
        setError(err.response.data)
      }
    }

    sendCodeToServer()
  }, [code, returnUrl])

  return (
    <>
      <Text>{error ? 'Something went wrong.' : 'Authenticating...'}</Text>
      <Pre>{error && JSON.stringify(error, null, 4)}</Pre>
    </>
  )
}

export default GoogleLoginCallback

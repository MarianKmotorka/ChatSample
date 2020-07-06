import React from 'react'
import { Wrapper, Card, Header, Content } from './styled/Login.styled'
import config from '../../utils/config.json'
import googleIcon from '../../img/google.png'

const Login = () => {
  const onGoogleLoginClick = () => {
    const queryParams = [
      `client_id=${config.GOOGLE_CLIENT_ID}`,
      `redirect_uri=${config.GOOGLE_AUTH_CALLBACK_URL}`,
      'response_type=code',
      'scope=openid profile email',
      'access_type=offline',
      'state=myCustomState'
    ].join('&')

    const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams

    window.location = url
  }

  return (
    <Wrapper>
      <Card>
        <Header>
          <p>Login</p>
        </Header>
        <Content>
          <button onClick={onGoogleLoginClick}>
            <img src={googleIcon} alt='' />
            <p>Google Login</p>
          </button>
        </Content>
      </Card>
    </Wrapper>
  )
}

export default Login

import React from 'react'
import config from '../../utils/config.json'
import googleIcon from '../../assets/img/google.png'
import { isLoggedIn } from '../../services/authService'
import { Wrapper, Card, Header, Content } from './styled/Login.styled'

const Login = ({ location, history }) => {
  if (isLoggedIn) history.replace('/')

  const onGoogleLoginClick = () => {
    const queryParams = [
      `client_id=${config.GOOGLE_CLIENT_ID}`,
      `redirect_uri=${config.GOOGLE_AUTH_CALLBACK_URL}`,
      'response_type=code',
      'scope=openid profile email',
      'access_type=offline',
      `state=${location?.state?.from || ''}`
    ].join('&')

    const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams

    window.location = url
  }

  return (
    <Wrapper>
      <Card>
        <Header>
          <p>Log in</p>
        </Header>
        <Content>
          <button onClick={onGoogleLoginClick}>
            <img src={googleIcon} alt='' />
            <p>Login with Google</p>
          </button>
        </Content>
      </Card>
    </Wrapper>
  )
}

export default Login

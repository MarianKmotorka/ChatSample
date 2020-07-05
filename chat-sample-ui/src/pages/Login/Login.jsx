import React from 'react'
import styled from 'styled-components'
import config from '../../utils/config.json'
import googleIcon from '../../img/google.png'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  height: 50vh;
  width: 50%;
  max-width: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: gray solid 1.5px;
  box-shadow: 0px 3px 2px 0px #ccc;
`

const Header = styled.div`
  font-size: 30px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  padding: 7px;
`

const Content = styled.div`
  flex: 1;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    padding: 8px;
    outline: transparent;
    border-radius: 6px;
    border: transparent;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 20px;

    &:hover {
    }

    & img {
      width: 15%;
      margin-right: 10px;
    }
  }
`

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

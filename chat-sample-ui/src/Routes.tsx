import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Logout from './pages/Logout'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/Login'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './components/ProtectedRoute'
import GoogleLoginCallback from './pages/Login/GoogleLoginCallback'
import Profile from './pages/Profile/Profile'
import NotFoundPage from './pages/NotFoundPage'

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute path='/' exact component={Home} />
        <ProtectedRoute path='/chats/:chatId' component={ChatPage} />
        <Route path='/google-login-callback' component={GoogleLoginCallback} />
        <Route path='/login' component={LoginPage} />
        <Route path='/logout' component={Logout} />
        <Route path='/' component={NotFoundPage} />
      </Switch>

      {/* Another <Switch /> so it creates an <Profile /> overlay over rendered components */}
      <Switch>
        <ProtectedRoute path='/:params*/profile' exact component={Profile} />
      </Switch>
    </>
  )
}

export default Routes

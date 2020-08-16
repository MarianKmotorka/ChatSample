import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../services/authService'

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn)
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location?.pathname || '' }
        }}
      />
    )

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default ProtectedRoute

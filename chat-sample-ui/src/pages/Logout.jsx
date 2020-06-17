import React from 'react'
import { logout } from '../services/authService'

const Logout = () => {
  logout()
  window.location = '/login'
}

export default Logout

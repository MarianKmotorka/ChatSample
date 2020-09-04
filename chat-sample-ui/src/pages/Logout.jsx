import { logout } from '../services/authService'

const Logout = () => {
  logout()
  window.location = '/login'

  return null
}

export default Logout

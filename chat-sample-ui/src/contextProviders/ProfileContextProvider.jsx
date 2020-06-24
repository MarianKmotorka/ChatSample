import React, { useState, useEffect, createContext } from 'react'
import api from '../services/httpService'
import { isLoggedIn } from '../services/authService'

export const ProfileContext = createContext()

const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/users/me')
      setProfile(data)
    }

    isLoggedIn && fetch()
  }, [])

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider

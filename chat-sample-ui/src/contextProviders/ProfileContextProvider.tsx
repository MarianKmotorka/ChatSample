import React, { useState, useEffect, createContext } from 'react'
import api from '../services/httpService'
import { isLoggedIn } from '../services/authService'
import { IUserProfileDto } from '../apiContracts/userContracts'

export const ProfileContext = createContext<{ profile: IUserProfileDto }>(null!)

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [profile, setProfile] = useState<IUserProfileDto>(null!)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/users/me')
      setProfile(data)
    }

    isLoggedIn && fetch()
  }, [])

  return <ProfileContext.Provider value={{ profile }}>{children}</ProfileContext.Provider>
}

export default ProfileContextProvider

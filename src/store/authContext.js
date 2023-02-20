import { useState, useEffect, useCallback, createContext } from 'react'

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

export const AuthContextProvider = (props) => {

  return (
    <h1>Authcontext</h1>
  )
}

export default AuthContext

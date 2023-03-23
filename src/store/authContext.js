import { useState, useEffect, useCallback, createContext } from 'react'
import axios from 'axios'
import serverURL from '../url'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
  username: ''
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')
  const storedId = localStorage.getItem('userId')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedId
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialId
  let initialToken

  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
    // console.log(localData)
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)
  const [username, setUsername] = useState('')


  const logout = useCallback(() => {
    // console.log('in logout')
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const login = (token, exp, userId) => {
    setToken(token)
    setUserId(userId)
    // console.log('in login',userId)
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
    localStorage.setItem('userId', userId)
    
    const remainingTime = calculateRemainingTime(exp)
    
    logoutTimer = setTimeout(logout, remainingTime)
    }

  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration)
    }
  }, [localData, logout])


  const findUsername = () => {
    axios.get(`${serverURL}/getusername/${userId}`)
    // .then((res) => setUsername(res.data))
    .then((res) => setUsername(res.data[0].username))
    .catch((err)=>console.log('could not get username',err))
  }

  useEffect(() => {
    findUsername()
  },[username])
    
  const contextValue = {
    token,
    login,
    logout, 
    userId,
    username
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

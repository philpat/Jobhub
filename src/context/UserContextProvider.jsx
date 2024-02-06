import React, {useState} from 'react'
import UserContext from './UserContext'
import Signup from '../pages/Signup'

const UserContextProvider = ({children})=>{
  const [loginUser, setLoginUser]=useState(null)
  return (
    <UserContext.Provider value={{loginUser, setLoginUser}}>
      {Signup}
    </UserContext.Provider>
  )
}
export default UserContextProvider

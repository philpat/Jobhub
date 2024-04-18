import React, {useState, useContext} from 'react'
import Dashboard from '../../components/Dashboard'
import UserContext from '../../context/UserContext'

const Admindashboard=()=>{
  const {setLoginUser} = useContext(UserContext)
  return(
    <div>
      <Dashboard />
    </div>
  )
}

export default Admindashboard
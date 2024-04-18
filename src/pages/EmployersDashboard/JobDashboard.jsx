import React, {useState, useContext} from 'react'
import Employerdashboard from '../../components/Employerdashboard'
import UserContext from '../../context/UserContext'

const JobDashboard=()=>{
  const {setLoginUser} = useContext(UserContext)
  return(
    <div>
      <Employerdashboard />
    </div>
  )
}

export default JobDashboard
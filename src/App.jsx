import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  )
}

export default App

import { Routes, Route} from 'react-router-dom'
import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import JobDashboard from './pages/EmployersDashboard/JobDashboard'
import PostJob from './pages/EmployersDashboard/PostJob'
import Admindashboard from './pages/AdminDashboard/Admindashboard'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin" element={<Admindashboard />}
        >
          <Route
            path='post-job'
            element={<PostJob />}
          />
        </Route>
        <Route path="/employer" element={<JobDashboard />}>
          <Route path="post-job" element={<PostJob />} />
        </Route>
    </Routes>
  )
}

export default App

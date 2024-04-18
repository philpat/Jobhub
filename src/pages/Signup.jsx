import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Select, Input, Option } from "@material-tailwind/react";
import axios from './../axios/axios';
import CircularProgress from '@mui/joy/CircularProgress';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import process from 'process';


const Signup = () => {

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); // Assuming setOpen is used to control the visibility of the Snackbar
  };
  


  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordConfirm = () => {
    setShowPassword1(!showPassword1)
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  const [role, setRole] = useState('')

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // const history = useHistory();

const admin_key = import.meta.env.VITE_ADMIN_KEY;

  const data = {
    firstName,
    lastName,
    email,
    password,
    password_confirmation,
    role,
    admin_key
  }

  const { setLoginUser } = useContext(UserContext);

  
  const handleRegister = async (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password || !password_confirmation || !role) {
      setErrMsg('All fields are required');
      return;
    }
    if (password.length < 8) {
      setErrMsg('Password must be atleast 8 characters long');
      return;
    }
    if (password !== password_confirmation) {
      setErrMsg('Password do not match');
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post('/api/auth/signup', data)
      setLoading(false);
      console.log(response.data)

      if (response.status === 201) {
        Swal.fire({
          text: "Registration successful!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        })
        setErrMsg('')
        // window.location.href ='/login'
      };
    } catch (error) {
      console.log(error.message)
      setLoading(false);
      Swal.fire({
        text: error.message,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      })
      // setErrMsg(error.message);

    }
  }


  return (
    <div className="bg-[#121223] h-screen">
      <div className="flex flex-col justify-center items-center  h-screen px-3 md:px-0">
        <div className="flex flex-col w-full max-w-lg p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <form action="" onSubmit={(e) => handleRegister(e)} className="flex flex-col gap-3">
            {/* <p
              className={
                errMsg
                  ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 col-span-full'
                  : 'hidden'
              }
              aria-live='assertive'
              role='alert'
            >
              {errMsg}
            </p> */}

            <Snackbar
              open={errMsg ? true : false}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="error" onClose={handleClose}>
                {errMsg}
              </Alert>
            </Snackbar>


            <div className=" text-center ">
              <h1 className=" text-3xl font-bold">SIGN UP</h1>
              <p className="text-sm text-gray-400">Please sign up to get started</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

              <div className="flex flex-col flex-1">
                <label htmlFor="name" className="text-sm font-medium">FirstName</label>
                {/* <input type="text"
                  onChange={(event) => setFirstName(event.target.value)}
                  id="fname" placeholder="John " className="p-2 rounded bg-slate-100 " /> */}

                <Input
                  type="text"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  placeholder="John"
                  className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="name" className="text-sm font-medium">Last Name</label>
                {/* <input type="text"
                  onChange={(event) => setLastName(event.target.value)}
                  id="lname" placeholder=" Doe" className="p-2 rounded bg-slate-100 " /> */}
                <Input
                  type="text"
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  placeholder="Doe"
                  className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />

              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder="example@gmail.com"
                className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className="flex flex-col relative">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  id="password" placeholder="xxxxxxxx"
                  className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-5 top-8 cursor-pointer"
                    onClick={togglePassword}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-5 top-8 cursor-pointer"
                    onClick={togglePassword}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="confirmpassword" className="text-sm font-medium">Re-type Password</label>

                <Input
                  type={showPassword1 ? 'text' : 'password'}
                  onChange={(event) => setPassword_confirmation(event.target.value)}
                  value={password_confirmation}
                  id="password1" placeholder="xxxxxxxx"
                  className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />

                {showPassword1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-5 top-8 cursor-pointer"
                    onClick={togglePasswordConfirm}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-5 top-8 cursor-pointer"
                    onClick={togglePasswordConfirm}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Select label='Select role'
                id="role"
                onChange={(selectedValue) => setRole(selectedValue)}

                className="!border !border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              >
                <Option value='admin'>Admin</Option>
                <Option value='employer'>Employer</Option>
                <Option value='user'>User</Option>
              </Select>
            </div>

            <button className="bg-[#FF7622] py-2 my-2 text-white rounded-md font-semibold"
              type='submit'>
              {loading ? <CircularProgress color="neutral" size="sm" /> : 'SIGNUP'}
            </button>
            <div className="flex items-center justify-center">
              <span className="text-gray-400">Already have an account? </span>
              <Link to='/' className="text-[#FF7622] text-sm font-semibold hover:underline pl-2"> Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
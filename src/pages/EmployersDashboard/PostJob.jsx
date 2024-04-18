import React, { useState, useContext } from 'react'
import { Input, Select, Option } from "@material-tailwind/react";
import CircularProgress from '@mui/joy/CircularProgress';
import Swal from 'sweetalert2';
import axios from '../../axios/axios';
import UserContext from '../../context/UserContext'



const PostJob = () => {

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [status, setStatus] = useState('')

  const { loginUser } = useContext(UserContext)
  console.log(loginUser.role)

  const createdBy = loginUser._id
  
  const handlePostJob = async (e) => {
    e.preventDefault()
    const data = {
      title,
      description,
      location,
      salary,
      createdBy,
      status
    }
    try {
      setLoading(true);

      const response = await axios.post('/api/jobs', data, {
        headers:{
          Authorization: `${loginUser?.role}`,
          
        },
        withCredentials : true
      })

      setLoading(false);
      console.log(response.data)
      if (response.status === 201) {
        Swal.fire({
          text: "Registration successful!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        })
        // setErrMsg('')

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
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <form action="" className="flex flex-col  w-full bg-white max-w-md rounded-lg shadow-lg"
        onSubmit={handlePostJob}
      >
        <h1 className=" text-2xl font-bold text-center pt-3">Post Job</h1>
        <div className="  text-center flex flex-col gap-4 p-8  ">
          <Input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            label="Job Title"
            className="border border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500  "
          />
          <Input
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            label="Job Description"
            className="border border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500  "
          />

          <Input
            type="text"
            onChange={(event) => setLocation(event.target.value)}
            value={location}
            label="Job Location"
            className=" border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500  "

          />

          <Input
            type="number"
            onChange={(event) => setSalary(event.target.value)}
            value={salary}
            label="Salary"
            className=" border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500  "

          />

          {/* <Input
            type="text"
            onChange={(event) => setCreatedBy(event.target.value)}
            value={createdBy}
            label="Job Creation"
            className="border border-gray-300 bg-slate-100 rounded  text-gray-900 shadow shadow-gray-900/5  placeholder:text-gray-500 focus:!border-gray-900  "

          /> */}

          <Select label="Status" id='status'
            onChange={(selectedValue) => setStatus(selectedValue)}
          >
            <Option value='draft'>Draft</Option>
            <Option value='published'>Published</Option>
          </Select>
          <button className="bg-[#FF7622] py-2 text-white rounded-md font-semibold" type='submit'
          >
            {loading ? <CircularProgress color="neutral" size="sm" /> : 'Post'}</button>
        </div>
      </form>
    </div>
  )
}
export default PostJob
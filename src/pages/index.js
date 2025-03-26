import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axios';
import { showToastMessage } from '@/utils/helpers';
import Head from 'next/head';

const Home = () => {

  const initial_states = {
    username: '',
    password: ''
  }

  const Router = useRouter()

  const [params, setParams] = useState(initial_states)

  const handleChange = (e) => {
    let { name, value } = e.target
    setParams({
      ...params,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosInstance.post('/login', params)
      .then((response) => {
        const data = response.data
        console.log(data, 'data')
        localStorage.setItem('simple-auth-token', JSON.stringify(data?.token))
        Router.push('/home')
        setParams(initial_states)
        showToastMessage('User successfully logged in', 'success')
      })
      .catch((error) => {
        const data = error?.response?.data
        showToastMessage(data?.message || 'Something went wrong', 'error')
      })
  }

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center bg-[#f2f2f2] lg:px-0 md:px-6 px-4'>
      <Head>
        <title>Login | Simple Auth</title>
      </Head>

      <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col lg:gap-4 gap-2 lg:w-96 w-full mx-auto bg-white rounded-lg p-6'>

        <div>
          <h2 className='lg:text-lg text-base font-semibold text-[#121212]'>Log In and Let’s Get Started</h2>
          <p className='lg:text-sm text-xs text-[#808080]'>Please enter your username and password.</p>
        </div>

        <input
          required
          type={"email"}
          name={"username"}
          value={params?.username}
          onChange={handleChange}
          placeholder={"Username"}
          className='text-sm p-3 w-full outline-none border border-[#c2c2c2]'
        />

        <input
          required
          type={"password"}
          name={"password"}
          value={params?.password}
          onChange={handleChange}
          placeholder={"Password"}
          className='text-sm p-3 w-full outline-none border border-[#c2c2c2]'
        />


        <button type="submit" className='text-sm p-3 w-full bg-[#121212] text-white font-medium font-sans cursor-pointer lg:hover:shadow-xl'>Submit</button>

      </form>

    </div>
  )
}

export default Home
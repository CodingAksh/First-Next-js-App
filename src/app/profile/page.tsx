"use client"

import React from 'react'
import axios from 'axios'
// import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const userProfile = () => {

  const router = useRouter()
  
  const logout = async() =>{
    try {
      const response = await axios.get('/Api/Users/logout')
      toast.success("logout successfully")
      console.log(response.data)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  return (
    <div className='flex flex-col space-y-6 justify-center items-center min-h-screen '>
      <span className='text-4xl'>Profile Page</span>
      <hr />
      <button onClick={logout} className='px-6 py-1.5 rounded-xl border-2 border-slate-500 text-white text-md'>Logout</button>
    </div>
  )
}

export default userProfile

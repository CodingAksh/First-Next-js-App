"use client"

import React from 'react'

const userProfile = ({params}: any) => {
  return (
    <div className='flex justify-center items-center min-h-screen '>
      <span className='text-4xl'>Profile Page <span className='ml-2 p-2 bg-orange-600 text-black'>{params.id}</span></span>
    </div>
  )
}

export default userProfile

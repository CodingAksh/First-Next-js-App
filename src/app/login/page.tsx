"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const Page = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false)

  const loginuser = async (e: any) =>{
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/Api/Users/login', user);
      toast.success("user login successful")
      console.log(response.data);
      router.push(`/profile/${response.data.userExist.username}`);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col space-y-3 justify-center items-center'>
      <h1 className='text-3xl mb-5'>Login page</h1>
      <form onSubmit={loginuser} className='flex space-y-3 flex-col justify-center items-center'>
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          className='inputField text-black'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          className='inputField'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <span>
          Don't have an account?{' '}
          <Link className='underline' href='/signup'>
            singup
          </Link>
        </span>
        <button
          type='submit'
          disabled={loading}
          className='px-6 py-1.5 rounded-xl border-2 border-slate-500 text-white text-md'
        >
          {loading ? "loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Page;
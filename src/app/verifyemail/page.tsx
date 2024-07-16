"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'

const VerifyEmail = () => {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = useCallback(async () => {
        try {
            await axios.post('/Api/Users/sendEmail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response);
        }
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    return (
        <div className='h-[100vh] flex flex-col gap-3 justify-center items-center '>
            <h1 className='text-4xl text-white-700'>Verify Email</h1>
            <span className='text-2xl px-2 bg-orange-500 text-white'>{token ? token : "no token"}</span>
            {error && (
                <div className='max-h-screen flex justify-center items-center'>
                    <h1 className='text-4xl text-orange-700'>An error occurred while verifying your email</h1>
                </div>
            )}

            {verified && (
                <div className='max-h-screen flex justify-center items-center'>
                    <h1 className='text-4xl text-orange-700'>Your Email is verified Now</h1>
                    <Link className='bg-white px-3 py-2 text-black text-xl' href='/login'>Do login</Link>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail

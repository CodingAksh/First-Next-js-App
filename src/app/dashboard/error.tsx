'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import toast from 'react-hot-toast'

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    toast.error(error.message)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
      className='bg-white text-black px-4 py-2 rounded-lg'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
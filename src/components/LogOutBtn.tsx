"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

const LogOutBtn = () => {
    const [loading, setloading] = useState(false)
    const handleLogout = async () => {
        setloading(true)
        await new Promise((resolve) => setTimeout(() => {
            setloading(false)
            toast.success('Logged Out')
        }, 2000))

    }

    return (
        <Button onClick={handleLogout} disabled={loading} className='w-24' variant={'outline'}>{loading ? <LoaderIcon className='animate-spin' /> : 'Log Out'}</Button>
    )
}

export default LogOutBtn
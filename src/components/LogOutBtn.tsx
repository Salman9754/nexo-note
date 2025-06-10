"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'
import supabase from '@/supabase/client'
import { useRouter } from "next/navigation"

const LogOutBtn = () => {
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const handleLogout = async () => {
        try {
            setloading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.replace('/login')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }
        finally {
            setloading(false)
        }
    }

    return (
        <Button onClick={handleLogout} disabled={loading} className='w-full' variant={'outline'}>{loading ? <LoaderIcon className='animate-spin' /> : 'Log Out'}</Button>
    )
}

export default LogOutBtn
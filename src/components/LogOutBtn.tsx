"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { LoaderIcon, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import supabase from '@/supabase/client'
import { useRouter } from "next/navigation"

interface LogOutBtnProps {
    isMobile?: boolean; // Optional prop to indicate mobile context
}

const LogOutBtn = ({ isMobile = false }: LogOutBtnProps) => {
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

    return isMobile ? (
        <Button
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
            size="icon"
            className="h-10 w-10" // Explicit size for consistency
            aria-label="Log Out"
        >
            {loading ? <LoaderIcon className="animate-spin h-5 w-5" /> : <LogOut className="h-5 w-5" />}
        </Button>
    ) : (
        <Button
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
            className="w-full"
        >
            {loading ? <LoaderIcon className="animate-spin" /> : "Log Out"}
        </Button>
    );
};


export default LogOutBtn
import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import AuthFormSignup from '@/components/AuthFormSignup'
import GuestGuard from '@/components/GuestGuard'

const Page = () => {
    return (
        <GuestGuard>
            <div className="mt-10 flex flex-1 flex-col items-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="mb-4">
                        <CardTitle className="text-center text-3xl">Sign Up</CardTitle>
                    </CardHeader>

                    <AuthFormSignup />
                </Card>
            </div>
        </GuestGuard>
    )
}

export default Page
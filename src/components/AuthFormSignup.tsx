"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { CardContent, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import supabase from "@/supabase/client"

type SignupFormValues = {
    name: string
    email: string
    password: string
}

function AuthFormSignup() {
    const [isPending, setIsPending] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: SignupFormValues) => {
        const { name, email, password } = data

        try {
            setIsPending(true)
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) throw error
            if (data && data.user) {
                const userId = data.user.id;
                try {
                    const { error: userError } = await supabase
                        .from('users')
                        .insert({ name: name, email: email, user_id: userId })
                    if (userError) throw userError
                    toast.success("Signed up successfully confirm email")
                    reset()
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(error.message)
                    } else {
                        toast.error("Something went wrong")

                    }
                }
                finally {
                    setIsPending(false)
                }

            }

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        disabled={isPending}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        disabled={isPending}
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        disabled={isPending}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
                </Button>

                <p className="text-xs">
                    "Already have an account?"{" "}
                    <Link
                        href="/login"
                        className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
                    >
                        Login
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthFormSignup

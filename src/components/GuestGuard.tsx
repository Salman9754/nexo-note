// components/GuestGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { LoaderIcon } from "lucide-react";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.replace("/"); // redirect to home if already logged in
        }
    }, [user, loading, router]);

    if (loading || user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderIcon className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useUser(); 

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login'); 
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return <>{children}</>;
}

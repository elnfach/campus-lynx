import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {ModernLoader} from "@/components/loading/modernLoader.tsx";

export const ProtectedRoute = (
    {
        children
    }: { children: React.ReactNode }
) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return <ModernLoader/>;
    }

    return <>{children}</>;
};
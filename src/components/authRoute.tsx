import {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {ModernLoader} from "@/components/loading/modernLoader.tsx";
import { auth } from '@/config/firebase';

export const AuthRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <ModernLoader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Outlet />;
};
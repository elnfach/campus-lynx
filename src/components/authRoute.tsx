import {Navigate, Outlet} from 'react-router-dom';
import {ModernLoader} from "@/components/ui/loading/modernLoader.tsx";
import {useAuth} from "@/hooks/useAuth.ts";

export const AuthRoute = () => {
    const {user, loading} = useAuth();

    if (loading) {
        return <ModernLoader />;
    }

    return user? <Navigate to="/profile" replace /> : <Outlet />;
};
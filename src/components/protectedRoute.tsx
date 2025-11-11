import {Navigate, Outlet} from 'react-router-dom';
import {ModernLoader} from "@/components/ui/loading/modernLoader.tsx";
import {useAuth} from "@/hooks/useAuth.ts";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <ModernLoader/>;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
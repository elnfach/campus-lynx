import {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {ModernLoader} from "@/components/loading/modernLoader.tsx";
import {auth, database} from "@/config/firebase.ts";
import {doc, getDoc} from "firebase/firestore";

const ProtectedRoute = (
    {
        requiredRole
    }: { requiredRole?: string }
) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const userDoc = doc(database, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);

                console.log("uid", user.uid)

                if (!userSnapshot.exists()) {
                    throw new Error('User data not found');
                }

                const role = userSnapshot.data()?.role;

                console.log("role:", role);
                console.log("req:", requiredRole);

                setHasAccess(!requiredRole || role === requiredRole);
            } catch (error) {
                console.error("Access check failed:", error);
                setHasAccess(false);
            } finally {
                setIsLoading(false);
            }
        });
    }, [requiredRole]);

    if (isLoading) {
        return <ModernLoader/>;
    }

    return hasAccess ? <Outlet/> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
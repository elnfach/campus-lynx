import {useEffect, useState} from 'react';
import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {query, where, getDocs, collection} from 'firebase/firestore';
import {auth, database} from '@/config/firebase';
import type {ClientUser} from '@/models/user/User.ts';
import {useUserService} from "@/hooks/useUserService.ts";

export const useAuth = () => {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const {fetchUser} = useUserService();

    useEffect(() => {
        let isMounted = true;
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!isMounted) return;
            try {
                if (firebaseUser) {
                    setUser(await fetchUser(firebaseUser.uid));
                } else {
                    setUser(null);
                }
            } catch {
                setError('Ошибка загрузки данных пользователя');
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        }
    });

    const loginWithUsername = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        if (attempts >= 3) {
            setError('Слишком много попыток. Попробуйте позже.');
            setLoading(false);
            throw new Error('Too many attempts');
        }

        try {
            const q = query(collection(database, 'users'), where('login', '==', username));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                throw new Error('Неверные учетные данные');
            }

            const data = snapshot.docs[0].data();
            await signInWithEmailAndPassword(auth, data.email, password);
            setAttempts(0);
            setLoading(false);
        } catch {
            setAttempts(prev => prev + 1);
            setError('Неверные учетные данные');
            setLoading(false);
            throw new Error('Неверные учетные данные');
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    const clearError = () => setError(null);

    return {
        user,
        loading,
        error,
        login,
        loginWithUsername,
        logout,
        clearError,
        attempts
    };
};
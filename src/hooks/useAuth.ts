import {useEffect, useState} from 'react';
import type {User} from 'firebase/auth';
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getDoc, query, where, getDocs, collection} from 'firebase/firestore';
import {auth, database} from '@/config/firebase';

type UserRole = 'admin' | 'employee';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(database, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role as UserRole);
                }
            }
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);

    const loginWithUsername = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        if (attempts >= 3) {
            setError('Слишком много попыток. Попробуйте позже.');
            throw new Error('Too many attempts');
        }

        try {
            const q = query(collection(database, 'users'), where('login', '==', username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                throw new Error('Пользователь не найден');
            }
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.role as UserRole);
            await signInWithEmailAndPassword(auth, userData.email, password);
            setAttempts(0);
        } catch (err) {
            setAttempts(prev => prev + 1);
            setError(err instanceof Error ? err.message : 'Ошибка входа');
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(database, 'users', userCredential.user.uid));
            if (userDoc.exists()) {
                setUserRole(userDoc.data().role as UserRole);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUserRole(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout failed');
            throw err;
        }
    };

    return { user, userRole, loading, error, login, loginWithUsername, logout };
};
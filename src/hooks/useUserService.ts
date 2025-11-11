import { useCallback } from 'react';
import {doc, getDoc, QueryDocumentSnapshot} from 'firebase/firestore';
import { database } from '@/config/firebase';
import type { ClientUser, ServerUser } from '@/models/user/User.ts';
import type { ClientUserRole, ServerUserRole } from '@/models/user/UserRole.ts';

export const useUserService = () => {
    const transformUserData = useCallback(async (user: ServerUser): Promise<ClientUser> => {
        const roles = await getDoc(doc(database, 'roles', user.role_id));
        if (!roles.exists()) {
            throw new Error('Role not found');
        }
        const role = roles.data() as ServerUserRole;

        return {
            ...user,
            role: {
                ...role,
                created_at: role.created_at.toDate(),
                updated_at: role.updated_at.toDate(),
            } as ClientUserRole,
            created_at: user.created_at.toDate(),
            last_time_in: user.last_time_in.toDate(),
        } as ClientUser;
    }, []);

    const fetchUser = useCallback(async (user_id: string): Promise<ClientUser | null> => {
        try {
            const userDoc = await getDoc(doc(database, 'users', user_id));

            if (!userDoc.exists()) {
                return null;
            }

            const userData = userDoc.data() as ServerUser;
            return await transformUserData(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }, [transformUserData]);

    const processDocument = useCallback(async (snapshot: QueryDocumentSnapshot): Promise<ClientUser> => {
        const data = snapshot.data() as ServerUser;
        return await transformUserData(data);
    }, [transformUserData]);

    return {
        transformUserData,
        fetchUser,
        processDocument
    };
};
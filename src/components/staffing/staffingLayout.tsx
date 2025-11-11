import {useEffect, useState} from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import type {ClientUser} from "@/models/user/User.ts";
import {useUserService} from "@/hooks/useUserService.ts";
import {StaffingCard} from "@/components/staffing/staffingCard.tsx";
import {ModernLoader} from "@/components/ui/loading/modernLoader.tsx";
import {database} from "@/config/firebase.ts";
import {useAuth} from "@/hooks/useAuth.ts";

export const StaffingLayout = () => {
    const { user } = useAuth();
    const { processDocument } = useUserService();
    const [, setSelectedUser] = useState<ClientUser | null>(null);
    const [users, setUsers] = useState<ClientUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const snapshot = await getDocs(collection(database, 'users'));
                const all_users = await Promise.all(
                    snapshot.docs.map(doc => processDocument(doc))
                );
                setUsers(all_users.filter(server_user => server_user.id !== user?.id));
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onSnapshot(collection(database, 'users'), async (snapshot) => {
            const all_users = await Promise.all(
                snapshot.docs.map(doc => processDocument(doc))
            );
            setUsers(all_users.filter(server_user => server_user.id !== user?.id));
        });

        fetchUsers();
        return () => unsubscribe();
    }, [processDocument, user]);

    if (loading) return <ModernLoader />;

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
                users.map(user => (
                    <StaffingCard
                        key={user.display_name}
                        user={user}
                        onClick={() => setSelectedUser(user)}
                    />
                ))) : (
                <p className="text-gray-500">Добавьте роли для сотрудников</p>
            )
            }
        </div>
    )
}
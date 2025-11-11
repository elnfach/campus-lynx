import type {Timestamp} from "firebase/firestore";
import type {UserStatus} from "@/models/user/UserStatus.ts";
import type {ClientUserRole} from "@/models/user/UserRole.ts";

export type ServerUser = {
    id: string,
    created_at: Timestamp,
    login: string,
    email: string,
    role_id: string,

    display_name: string,
    profile_id: string,
    status: UserStatus,
    last_time_in: Timestamp,
}

export type ClientUser = Omit<ServerUser, 'created_at' | 'role_id' | 'last_time_in'> & {
    created_at: Date,
    role: ClientUserRole,
    last_time_in: Date,
}
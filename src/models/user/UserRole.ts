import type {Timestamp} from "firebase/firestore";

export type ServerUserRole = {
    id: string,
    name: string,
    description: string,
    permissions: [],
    created_at: Timestamp,
    updated_at: Timestamp,
}

export type ClientUserRole = Omit<ServerUserRole, 'id' | 'created_at' | 'updated_at'> & {
    created_at: Date,
    updated_at: Date,
}
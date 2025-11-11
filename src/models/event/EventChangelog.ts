import type {ServerUser} from "@/models/user/User.ts";
import type {Timestamp} from "firebase/firestore";

export type EventChangelog = {
    author: ServerUser,
    description?: string,
    updated_at: Timestamp,
}
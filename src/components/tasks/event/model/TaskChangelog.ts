import type {User} from "firebase/auth";
import type {EventTaskStatusType} from "@/models/event/EventTaskStatus.ts";


export type TaskChangelog = {
    author: User,
    status: EventTaskStatusType,
    updated_at: Date,
}
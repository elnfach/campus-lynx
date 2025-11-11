import type {EventTaskStatusType} from "@/models/event/EventTaskStatus.ts";
import type {ServerUser} from "@/models/user/User.ts";
import type {Timestamp} from "firebase/firestore";

export type EventTaskChangelog = {
    author: ServerUser,
    status: EventTaskStatusType,
    updated_at: Timestamp,
}
import type {Timestamp} from "firebase/firestore";
import type {User} from "firebase/auth";
import type {EventTaskStatusType} from "@/models/event/EventTaskStatus.ts";
import type {EventTaskChangelog} from "@/models/event/EventTaskChangelog.ts";

export type EventTask = {
    id: string,
    author: User,
    created_at: Timestamp,

    changelog: EventTaskChangelog[],
    status: EventTaskStatusType,

    title: string,
    description: string,
}
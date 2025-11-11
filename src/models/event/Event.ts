import type {ServerUser} from "@/models/user/User.ts";
import type {Timestamp} from "firebase/firestore";
import type {EventChangelog} from "@/models/event/EventChangelog.ts";
import type {EventStatus} from "@/models/event/EventStatus.ts";
import type {EventTask} from "@/models/event/EventTask.ts";

export type Event = {
    id: string,

    author: ServerUser,
    created_at: Timestamp,
    change_log: EventChangelog[],

    from: Timestamp,
    to: Timestamp,

    status: EventStatus,
    tasks: EventTask,

    title: string,
}
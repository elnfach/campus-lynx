import type {EventTaskStatusType} from "@/models/event/EventTaskStatus.ts";
import type {TaskChangelog} from "@/components/tasks/event/model/TaskChangelog.ts";
import type {ServerUser} from "@/models/user/User.ts";

export type Task = {
    id: string,
    author: ServerUser,
    created_at: Date,

    changelog: TaskChangelog[],
    status: EventTaskStatusType,

    title: string,
    description: string,
}


export const EventTaskStatus = {
    Opened: 'opened',
    InProcess: 'in-process',
    Closed: 'closed',
    Paused: 'paused'
} as const;

export type EventTaskStatusType = typeof EventTaskStatus[keyof typeof EventTaskStatus];
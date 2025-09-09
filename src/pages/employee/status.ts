export const Status = {
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
} as const;

export type Status = typeof Status[keyof typeof Status];
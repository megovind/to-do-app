export const TASK_STATUSES: string[] = ['To Do', 'In Progress', 'Done'];

export const STATUS_COLORS: { [key: string]: string } = {
    'To Do': 'bg-blue-100 text-blue-500',
    'In Progress': 'bg-yellow-100 text-yellow-500',
    'Done': 'bg-green-100 text-green-500',
};

export const STATUS_TEXT_COLORS: { [key: string]: string } = {
    'To Do': 'text-red-500',
    'In Progress': 'text-yellow-500',
    'Done': 'text-green-500',
};
export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
}

export interface TaskResponse {
    _id: string;
    title: string;
    description: string;
    status: string;
  }
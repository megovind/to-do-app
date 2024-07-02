import { axiosInstance } from '../../config/baseConfiguration'
import { getLocalStorageItem } from '../../config/local-storage';
import { Task } from '../../utils/types';

const accessToken = getLocalStorageItem('accessToken');
const authHeader = { headers: { 'Authorization': `Bearer ${accessToken}` } };
export const fetchTasks = async () => {
    const response = await axiosInstance.get('/tasks', authHeader);
    return response.data;
}

export const createTask = async (task: Task) => {
    const response = await axiosInstance.post('/tasks', task, authHeader);
    return response.data;
}

export const editTask = async (task: Task) => {
    const response = await axiosInstance.put(`/tasks/${task.id}`, task, authHeader);
    return response.data;
}

export const deleteTask = async (taskId: string) => {
    const response = await axiosInstance.delete(`/tasks/${taskId}`, authHeader);
    return response.data;
}
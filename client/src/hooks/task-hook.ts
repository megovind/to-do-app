import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createTask, deleteTask, editTask, fetchTasks } from '../services/tasks';
import { Task, TaskResponse } from '../utils/types';
import { ChangeEvent, useState } from 'react';

const queryClient = new QueryClient();

export const useTaskHook = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<string>('All');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
  
    const { data, isLoading, error: fetchTaskError } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const { mutateAsync: deleteMutate, error: deleteError } = useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    });
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
    };
  
    const handleDelete = async () => {
      const id =selectedTask ? selectedTask._id :'';
      await deleteMutate(id);
      if (deleteError) {
        console.log('Error deleting task:', deleteError);
        return;
      }
      const taskIndex = data.findIndex((task: TaskResponse) => task._id ===id)
      data.splice(taskIndex, 1);
      setIsDialogOpen(false);
    };
  
    const handleCancel = () => {
      setIsDialogOpen(false);
      setSelectedTask(null);
    };
  
    const openDialogue = (task: TaskResponse) => {
      setIsDialogOpen(true);
      setSelectedTask(task);
    }
  
    const { mutateAsync, error: addError } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    const { mutateAsync: updateTask, error: updateError } = useMutation({
        mutationFn: editTask,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    const handleTaskSubmit = async (task: Task) => {
    task.id ? await updateTask(task) : await mutateAsync(task);
        if (addError || updateError) {
        console.log('Error creating task:', addError || updateError);
        return;
        }
        navigate({ to: '/tasks' });
    };

    return  {
        tasks: data,
        isTaskLoading: isLoading,
        fetchTaskError,
        navigate,
        isDialogOpen,
        filter,
        openDialogue,
        handleCancel,
        handleFilterChange,
        handleDelete,
        handleTaskSubmit,
    }
}
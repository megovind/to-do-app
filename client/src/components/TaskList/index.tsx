import React, { useState, ChangeEvent } from 'react';
import Dropdown from '../common/Dropdown';
import { STATUS_TEXT_COLORS, TASK_STATUSES } from '../../utils/constants';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../services/tasks';
import ConfirmDialog from '../common/ConfirmDialogue';
import TaskCard from './task-card';
import NoDataCard from '../common/NotFound';

export interface TaskResponse {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: TaskResponse[];
}

const queryClient = new QueryClient();

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filter, setFilter] = useState<string>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

  const { mutateAsync, error } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);
  const handleDelete = async () => {
    const id =selectedTask ? selectedTask._id :'';
    await mutateAsync(id);
    if (error) {
      console.log('Error deleting task:', error);
      return;
    }
    const taskIndex = tasks.findIndex(task => task._id ===id)
    tasks.splice(taskIndex, 1);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 justify-end">
        <Dropdown
          options={['All', ...TASK_STATUSES]}
          value={filter}
          onChange={handleFilterChange}
          className={`w-full max-w-xs ${STATUS_TEXT_COLORS[filter]}`}
        />
      </div>
      <ul className="space-y-4">
        {filteredTasks.length ? filteredTasks.map(task => (
           <TaskCard task={task} openDialogue={(task) => openDialogue(task)} />
        )) : <NoDataCard message='No Task is created Yet!' />}
      </ul>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaskList;

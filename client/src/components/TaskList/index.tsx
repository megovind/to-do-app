import React, { useState, ChangeEvent } from 'react';
import Dropdown from '../common/Dropdown';
import { STATUS_COLORS, STATUS_TEXT_COLORS, TASK_STATUSES } from '../../utils/constants';
import Button from '../common/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../services/tasks';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

const queryClient = new QueryClient();

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filter, setFilter] = useState<string>('All');
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
  const onDeleteTask = async (id: string) => {
    await mutateAsync(id);
    if (error) {
      console.log('Error deleting task:', error);
      return;
    }
    const taskIndex = tasks.findIndex(task => task._id ===id)
    tasks.splice(taskIndex, 1);
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
        {filteredTasks.map(task => (
          <li key={task._id} className="p-4 bg-white rounded-lg shadow-md">
            <div className='flex justify-between'>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <Button size='small' variant='link' icon={<TrashIcon className='h-5 w-5 text-red-500' />} onClick={() => onDeleteTask(task._id)} />
            </div>
            <p>{task.description}</p>
            <div className='flex'>
            {/* Status: */}
            <div className={`items-center whitespace-nowrap rounded-lg py-1 px-2 font-sans text-xs uppercase text-white mt-2 ${STATUS_COLORS[task.status]}`}>
              <span>{task.status}</span>
            </div>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

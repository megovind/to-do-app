import React from 'react';
import Button from '../common/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { STATUS_COLORS } from '../../utils/constants';
import { TaskResponse } from '.';

interface TaskCardProps {
  task: TaskResponse;
  openDialogue: (task: TaskResponse) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, openDialogue }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className='flex justify-between'>
            <h3 className="text-xl font-bold mb-2">{task.title}</h3>
            <Button size='small' variant='link' icon={<TrashIcon className='h-5 w-5 text-red-500' />} onClick={() =>  openDialogue(task)} />
        </div>  
      <p className="text-gray-700 mb-4">{task.description}</p>
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${STATUS_COLORS[task.status]}`}
      >
        {task.status}
      </span>
    </div>
  );
};

export default TaskCard;

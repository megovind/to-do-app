import React, { useState, ChangeEvent } from 'react';
import Dropdown from '../common/Dropdown';
import { STATUS_COLORS, STATUS_TEXT_COLORS, TASK_STATUSES } from '../../utils/constants';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filter, setFilter] = useState<string>('All');

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

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
          <li key={task.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className='flex justify-between'>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <div className={`relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs uppercase text-white ${STATUS_COLORS[task.status]}`}>
                <span>{task.status}</span>
              </div>
            </div>
            
            <p>{task.description}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

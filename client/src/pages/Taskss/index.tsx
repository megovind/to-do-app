import React from 'react';
import TaskList from '../../components/TaskList';
import Button from '../../components/common/Button';
// dummy tasks lists
const tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', status: 'TO DO' },
  { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
  { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' },
  { id: 4, title: 'Task 4', description: 'Description 4', status: 'TO DO' },
];

const Tasks: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <div className='flex justify-between my-5'>
          <h1 className="text-2xl font-bold text-center">Task List</h1>
            <Button 
              onClick={() => console.log('Add Task')}
              variant='link' 
            >
              Add Task
            </Button>
          </div>
            <TaskList tasks={tasks} />
        </div>
    </div>
  );
}

export default Tasks;

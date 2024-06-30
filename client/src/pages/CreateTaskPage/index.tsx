import React from 'react';
import TaskForm from '../../components/TaskForm';

const CreateTaskPage: React.FC = () => {
  const handleTaskSubmit = (task: { title: string; description: string; status: string }) => {
    console.log('Task submitted:', task);
    // Here you can handle the taskand  save it to a server
  };

  return (
    <div className='container mx-auto p-4'>
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold my-5 text-left">Add Task</h1>
        <TaskForm onSubmit={handleTaskSubmit} />
      </div>
    </div>
    </div>
  );
}

export default CreateTaskPage;

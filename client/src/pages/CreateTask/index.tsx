import TaskForm from '../../components/TaskForm';
import { useTaskHook } from '../../hooks/task-hook';


function CreateTaskPage() {
  const { handleTaskSubmit } = useTaskHook();
  return (
    <div className='container mx-auto p-4'>
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <TaskForm onSubmit={handleTaskSubmit} />
        </div>
      </div>
    </div>
  );
}

export default CreateTaskPage;

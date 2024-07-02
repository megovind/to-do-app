import TaskForm from '../../components/TaskForm';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createTask, editTask } from '../../services/tasks';
import { Task } from '../../utils/types';
import { useNavigate } from '@tanstack/react-router';

const queryClient = new QueryClient();

function CreateTaskPage() {
  const navigate = useNavigate();
  const { mutateAsync, error } = useMutation({
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
    if (error || updateError) {
      console.log('Error creating task:', error);
      return;
    }
    navigate({ to: '/tasks' });
  };

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

import TaskList from '../../components/TaskList';
import Button from '../../components/common/Button';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../../services/tasks';
import { useNavigate } from '@tanstack/react-router';
import ErrorCard from '../../components/common/ErrorCard';

function Tasks(){
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
  return (
    <div className="flex items-center justify-center my-20">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <div className='flex justify-between my-5'>
          <h1 className="text-2xl font-bold text-center">Task List</h1>
            <Button 
              onClick={() => {navigate({to: '/create-task'}) } }
              variant='link' 
            >
              Add Task
            </Button>
          </div>
            {isLoading && <p>Loading...</p>}
            {error && <ErrorCard errorMessage={error.message} />}
            {data && <TaskList tasks={data} />}
        </div>
    </div>
  );
}

export default Tasks;

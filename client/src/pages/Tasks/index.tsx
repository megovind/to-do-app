import TaskList from '../../components/TaskList';
import Button from '../../components/common/Button';
import ErrorCard from '../../components/common/ErrorCard';
import { useTaskHook } from '../../hooks/task-hook';

function Tasks(){
  const { tasks, isTaskLoading, fetchTaskError, navigate } = useTaskHook();
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
          {isTaskLoading && <p>Loading...</p>}
          {fetchTaskError && <ErrorCard errorMessage={fetchTaskError.message} />}
          {tasks && <TaskList tasks={tasks} />}
      </div>
    </div>
  );
}

export default Tasks;

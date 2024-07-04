import React from 'react';
import Dropdown from '../common/Dropdown';
import { STATUS_TEXT_COLORS, TASK_STATUSES } from '../../utils/constants';
import ConfirmDialog from '../common/ConfirmDialogue';
import TaskCard from './task-card';
import NoDataCard from '../common/NotFound';
import { useTaskHook } from '../../hooks/task-hook';
import { TaskResponse } from '../../utils/types';

interface Props {
  tasks: TaskResponse[];
}
const TaskList: React.FC<Props> = ({ tasks }) => {
  const {
    filter,
    isDialogOpen,
    handleCancel,
    handleDelete,
    handleFilterChange,
    openDialogue,
    navigate
  } = useTaskHook();

  const filteredTasks : TaskResponse[] = filter === 'All' ? tasks : tasks.filter((task: TaskResponse) => task.status === filter) ;

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
          <TaskCard
            key={task._id}
            task={task}
            openDialogue={(task) => openDialogue(task)}
            updateTask={(task) => { navigate({to: `/update-task/${JSON.stringify(task)}` }) }}
          />
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

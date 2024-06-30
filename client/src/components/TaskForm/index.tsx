import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import { STATUS_TEXT_COLORS, TASK_STATUSES } from '../../utils/constants';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; status: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    status: '',
  });

  const validate = () => {
    const tempErrors = { title: '', description: '', status: '' };
    let isValid = true;

    if (!formData.title || formData.title.trim().split(' ').length < 2) {
      tempErrors.title = 'Title must not be empty.';
      isValid = false;
    }

    if (!formData.description || formData.description.trim().split(' ').length < 5) {
      tempErrors.description = 'Description must be at least 5 words.';
      isValid = false;
    }

    if (!formData.status) {
      tempErrors.status = 'Status is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ title: '', description: '', status: 'To Do' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full"
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <Input
          type="text"
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          className="w-full"
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <Dropdown
          options={TASK_STATUSES}
          value={formData.status}
          onChange={handleChange}
          name="status"
          className={`w-full ${STATUS_TEXT_COLORS[formData.status]}`}
        />
        {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
      </div>
      <div className='flex justify-end'> 
        <Button type="submit" variant="primary" size="medium">
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;

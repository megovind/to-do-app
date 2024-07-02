import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters long';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(username, password);
      setUsername('');
      setPassword('');
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <Input
            type="text"
            name='username'
            className="w-full"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">{errors.username}</p>
          )}
        </div>
        <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Input
            type="password"
            name='password'
            className="w-full"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <div className='flex justify-end'>
            <Button type="submit" variant="primary">Login</Button>
        </div>
      </form>
  );
};

export default LoginForm;

import React, { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  name,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
      {...rest}
    />
  );
};

export default Input;

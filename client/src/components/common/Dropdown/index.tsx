import React from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  name?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className = '', name }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      className={`appearance-none border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
    >
        {options.map((option, index) => (
          <option key={index} value={option}>
            <span> {option} </span>
          </option>
        ))}
    </select>
  );
};

export default Dropdown;

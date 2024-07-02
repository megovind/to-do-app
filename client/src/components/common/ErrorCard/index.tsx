import React from 'react';

interface ErrorCardProps {
  errorMessage: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636L5.636 18.364m12.728 0L5.636 5.636"
          ></path>
        </svg>
        <h2 className="text-xl font-semibold mb-2 text-red-600">API Request Failed</h2>
        <p className="text-gray-600">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorCard;

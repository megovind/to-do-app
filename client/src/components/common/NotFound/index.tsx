import React from 'react';

interface NoDataCardProps {
  message: string;
}

const NoDataCard: React.FC<NoDataCardProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11h.01"
          ></path>
        </svg>
        <h2 className="text-xl font-semibold mb-2">No Data Found</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default NoDataCard;

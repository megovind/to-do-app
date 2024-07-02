import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { UserIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My To-Do App</h1>
        {isAuthenticated ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full">
                <UserIcon className="w-6 h-6" />
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <button
                  onClick={() => {
                    onLogout();
                    closeDropdown();
                  }}
                  className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200 hover:rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

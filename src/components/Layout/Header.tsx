import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user?.email}</span>
          <Button onClick={logout} className="bg-blue-500 text-white">Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
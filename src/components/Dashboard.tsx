import React, { useState, useEffect } from 'react';
import TaskList from './Taskmanagement/TaskList';
import KanbanBoard from './Taskmanagement/KanbanBoard';
import TaskForm from './Taskmanagement/TaskForm';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';


const Dashboard: React.FC = () => {
  const [view, setView] = useState<'list' | 'board'>('list');
  const { user, logout } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { fetchTasks } = useTask();
  // console.log(`user: ${user} email: ${user?.email}`)


  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user?.email}</span>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <div>
            <Button onClick={() => setView('list')} className="mr-2 bg-blue-500 text-white">List View</Button>
            <Button onClick={() => setView('board')} className="bg-blue-500 text-white">Board View</Button>
          </div>
        </div>
        <Button onClick={() => setShowTaskForm(true)} className="mb-4 bg-blue-500 text-white">Add New Task</Button>
        {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
        {view === 'list' ? <TaskList />: <KanbanBoard />}
      </div>
    </>
  );
};

export default Dashboard;
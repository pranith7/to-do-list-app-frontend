import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Layout/Sidebar'

const App: React.FC = () => {
  return (
    <Router>
    <AuthProvider>
      <TaskProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={
                                          <PrivateRoute> 
                                            <Dashboard />
                                          </PrivateRoute>
                                          } />
                </Routes>
              </main>
            </div>
          </div>
      </TaskProvider>
    </AuthProvider>
    </Router>
  );
};

export default App;
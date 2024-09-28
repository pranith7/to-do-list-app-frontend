import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
}

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, '_id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  const fetchTasks = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime > 60000) { // Only fetch if forced or more than 1 minute has passed
      try {
        const response: ApiResponse<Task[]> = await getTasks();
        setTasks(response.data);
        setLastFetchTime(now);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }, [lastFetchTime]);

  useEffect(() => {
    fetchTasks(); // Initial fetch
    
    const intervalId = setInterval(() => {
      fetchTasks(); // Regular fetch every minute
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fetchTasks]);

  const addTask = async (task: Omit<Task, '_id'>) => {
    try {
      const response: ApiResponse<Task> = await createTask(task);
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskItem = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const response: ApiResponse<Task> = await updateTask(id, updatedTask);
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? { ...task, ...response.data } : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask: updateTaskItem, removeTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
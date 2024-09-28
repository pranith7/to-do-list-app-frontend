import axios from 'axios';
import { Task } from '../contexts/TaskContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://to-do-list-app-backend-wv4h.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request config:', JSON.stringify(config.headers, null, 2));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData: Omit<Task, '_id'>) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: Partial<Omit<Task, '_id'>>) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default api;
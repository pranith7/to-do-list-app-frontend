import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { useTask } from '../../contexts/TaskContext';

const TaskList: React.FC = () => {
  const [sortBy, setSortBy] = useState('dueDate');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const { tasks, fetchTasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const sortedAndFilteredTasks = React.useMemo(() => {
    try {
      const taskArray = Array.isArray(tasks) ? tasks : [];
      if (!taskArray || !Array.isArray(taskArray)) {
        console.error('Tasks is not an array:', tasks);
        return [];
      }
      return taskArray
        .filter(task => !filterStatus || task.status === filterStatus)
        .filter(task => !filterPriority || task.priority === filterPriority)
        .sort((a, b) => {
          if (sortBy === 'dueDate') {
            return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
          } else if (sortBy === 'priority') {
            const priorityOrder = { Low: 1, Medium: 2, High: 3 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          return 0;
        });
    } catch (error) {
      console.error('Error processing tasks:', error);
      return [];
    }
  }, [tasks, filterStatus, filterPriority, sortBy]);

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      {sortedAndFilteredTasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
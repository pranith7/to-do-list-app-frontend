import React from 'react';
import KanbanColumn from './KanbanColumn';
import { useTask } from '../../contexts/TaskContext';
import { useEffect } from 'react';

const KanbanBoard: React.FC = () => {
  const { tasks, updateTask } = useTask();

  useEffect(() => {
    console.log('Tasks received in KanbanBoard:', tasks);
  }, [tasks]);

  const columns = ['To Do', 'In Progress', 'Completed'] as const;

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: typeof columns[number]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    updateTask(taskId, { status });
  };

  const sortedTasks = (() => {
    try {
      const taskArray = Array.isArray(tasks) ? tasks : [];
      if (!taskArray || !Array.isArray(taskArray)) {
        console.error('Tasks is not an array:', tasks);
        return [];
      }
      return taskArray;
    } catch (error) {
      console.error('Error processing tasks:', error);
      return [];
    }
  })();

  return (
    <div className="flex space-x-4">
      {columns.map(column => (
        <KanbanColumn
          key={column}
          title={column}
          tasks={sortedTasks.filter(task => task.status === column)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
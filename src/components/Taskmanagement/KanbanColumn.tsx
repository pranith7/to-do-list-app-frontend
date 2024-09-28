import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../../contexts/TaskContext';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg w-1/3"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h3 className="font-bold mb-4">{title}</h3>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
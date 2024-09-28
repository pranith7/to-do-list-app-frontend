import React, { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Button } from '../ui/button';
import { Task } from '../../contexts/TaskContext';

interface TaskItemProps {
  task: Task;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDragStart }) => {
  const { updateTask, removeTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(task._id, { status: e.target.value as Task['status'] });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeTask(task._id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="bg-white p-4 mb-2 rounded shadow"
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, task._id)}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full mb-2 p-1 border rounded"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="w-full mb-2 p-1 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
            onChange={handleInputChange}
            className="w-full mb-2 p-1 border rounded"
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleSelectChange} // Use the new handler here
            className="w-full mb-2 p-1 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <Button onClick={handleSave} className="mr-2">Save</Button>
          <Button onClick={handleCancel} variant="outline">Cancel</Button>
        </>
      ) : (
        <>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
          <select value={task.status} onChange={handleStatusChange} className="mt-2 p-1 border rounded">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <Button onClick={handleEdit} className="mt-2 mr-2 bg-blue-500 text-white">Edit</Button>
          <Button onClick={handleDelete} className="mt-2 bg-red-500 text-white">Delete</Button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
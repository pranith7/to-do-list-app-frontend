import { useState, DragEvent } from 'react';

export const useDragAndDrop = () => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const onDragStart = (e: DragEvent<HTMLElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedTask(taskId);
  };

  const onDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggedTask(null);
  };

  return { draggedTask, onDragStart, onDragOver, onDrop };
};
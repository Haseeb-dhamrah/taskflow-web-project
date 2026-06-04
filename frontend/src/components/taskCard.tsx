import React from 'react';
import { type Task } from '../types/Task';

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className={`card priority-${task.priority.toLowerCase()}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-meta">
        <span className="badge status">Status: {task.status}</span>
        <span className="badge priority">Priority: {task.priority}</span>
        {task.dueDate && <span className="date">Due: {task.dueDate}</span>}
        <span className="date">Created: {task.createdAt}</span>
      </div>
      <div className="card-actions">
        <button onClick={() => onDelete(task.id)} className="btn delete-btn">Delete</button>
      </div>
    </div>
  );
};
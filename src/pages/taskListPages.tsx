import React from 'react';
import { type Task } from '../types/Task';
import { TaskCard } from '../components/taskCard';

type TaskListPageProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
};

export const TaskListPage: React.FC<TaskListPageProps> = ({ tasks, onDelete }) => {
  return (
    <div className="page task-list-page">
      <h2>Your Dashboard Tasks</h2>
      <div className="tasks-grid">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};
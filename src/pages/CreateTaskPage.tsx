import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from '../types/Task';
import { TaskForm } from '../components/taskForm';

type CreateTaskPageProps = {
  onSaveTask: (task: Task, isEditing: boolean) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
};

export const CreateTaskPage: React.FC<CreateTaskPageProps> = ({ onSaveTask, editingTask, setEditingTask }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setEditingTask(null);
    navigate('/'); // Cancel karne par wapas dashboard par le jaye
  };

  const handleSaveAndRedirect = (task: Task, isEditing: boolean) => {
    onSaveTask(task, isEditing);
    navigate('/'); // Task save hote hi automatic home screen par le jaye
  };

  return (
    <div className="page form-page">
      <h2>{editingTask ? "Update Existing Task" : "Create New Task"}</h2>
      <TaskForm 
        onSaveTask={handleSaveAndRedirect} 
        editingTask={editingTask} 
        onCancel={handleCancel} 
      />
    </div>
  );
};
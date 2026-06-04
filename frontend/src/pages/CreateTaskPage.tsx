import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from '../types/Task';
import { TaskForm } from '../components/taskForm';

type CreateTaskPageProps = {
  onSaveTask: (task: any) => Promise<void>; // Isko async handler ke mutabiq badla hai
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
};

export const CreateTaskPage: React.FC<CreateTaskPageProps> = ({ onSaveTask, editingTask, setEditingTask }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setEditingTask(null);
    navigate('/'); 
  };

  const handleSaveAndRedirect = async (task: Task) => {
    // Pehle backend par save hone ka wait karega
    await onSaveTask(task);
    // Agar koi validation error nahi aati aur data save ho jata hai, tabhi redirect hoga
    navigate('/'); 
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
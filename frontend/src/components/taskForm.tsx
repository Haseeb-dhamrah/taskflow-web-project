import React, { useState, useEffect } from 'react';
import { type Task, type TaskStatus, type TaskPriority } from '../types/Task';

type TaskFormProps = {
  onSaveTask: (task: any) => void; // Isko async-wrapper ke mutabiq flexible kiya hai
  editingTask: Task | null;
  onCancel: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSaveTask, editingTask, onCancel }) => {
  // Form Fields States
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("Todo");
  const [priority, setPriority] = useState<TaskPriority>("Low");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  // useEffect: Jab bhi editingTask change hoga, fields auto-fill ho jayein
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate ?? "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setPriority("Low"); // Typo fixed (priority: "Low" to setPriority)
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Frontend Title Validation Check (List B Requirement)
    if (!title.trim()) {
      setError("Task title is required."); 
      return;
    }

    // Backend format ke mutabiq object taiyar kiya
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status: status,
      priority: priority,
    };

    // Parent handler (App.tsx) ko bhej diya jo fetch request hit karega
    onSaveTask(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Error Validation Message */}
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => { setTitle(e.target.value); setError(""); }} 
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn submit-btn">
          {editingTask ? "Update Task" : "Create Task"}
        </button>
        <button type="button" onClick={onCancel} className="btn cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};
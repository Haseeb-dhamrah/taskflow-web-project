import React, { useState, useEffect } from 'react';
import { type Task, type TaskStatus, type TaskPriority } from '../types/Task';

type TaskFormProps = {
  onSaveTask: (task: Task, isEditing: boolean) => void;
  editingTask: Task | null;
  onCancel: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSaveTask, editingTask, onCancel }) => {
  // Form Fields States [cite: 106, 107, 108, 109, 110]
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("Todo");
  const [priority, setPriority] = useState<TaskPriority>("Low");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  // useEffect: Jab bhi editingTask change hoga, form fields me purana data bhar jaye ga (Bonus) [cite: 258]
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate ?? "");
    } else {
      // Agar edit nahi ho raha toh form reset rahe [cite: 119, 120]
      setTitle("");
      setDescription("");
      setStatus("Todo");
      priority: "Low";
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Title Validation Check 
    if (!title.trim()) {
      setError("Task title is required."); 
      return;
    }

    const taskData: Task = {
      id: editingTask ? editingTask.id : Date.now(), // Edit me purani ID, new me timestamp
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString().split('T')[0]
    };

    onSaveTask(taskData, !!editingTask);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Error Validation Message [cite: 111, 123] */}
      {error && <div className="error-message">{error}</div>}

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

      <div className="form-group">
        <label>Due Date</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </div>

      <div className="form-actions">
        {/* Dynamic Button Text (Bonus) [cite: 271] */}
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
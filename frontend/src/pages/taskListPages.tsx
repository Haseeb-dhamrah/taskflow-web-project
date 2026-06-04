import React, { useState, useEffect } from 'react';
import { type Task } from '../types/Task';
import { TaskCard } from '../components/taskCard';

type TaskListPageProps = {
  tasks: Task[];
  onDelete: (id: number | string) => void;
};

export const TaskListPage: React.FC<TaskListPageProps> = ({ onDelete }) => {
  
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  
  const fetchFilteredTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks?status=${filterStatus}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredTasks(data);
      }
    } catch (error) {
      console.error("Error filtering tasks:", error);
    }
  };

  // Jab bhi filterStatus change hoga, yeh automatic chalega
  useEffect(() => {
    fetchFilteredTasks();
  }, [filterStatus]);

  return (
    <div className="page task-list-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Your Dashboard Tasks</h2>
        
        {/* --- Product Feature: Filter Dropdown --- */}
        <div className="filter-container">
          <label htmlFor="status-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Status: </label>
          <select 
            id="status-filter"
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
          >
            <option value="All">All Tasks</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="tasks-grid">
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1', marginTop: '20px' }}>
            No tasks found for status: <strong>{filterStatus}</strong>
          </p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              // State update ke baad layout ko automatic refresh karne ke liye fetch function pass kar rahe hain
              onDelete={async (id) => {
                await onDelete(id);
                fetchFilteredTasks();
              }} 
            />
          ))
        )}
      </div>
    </div>
  );
};
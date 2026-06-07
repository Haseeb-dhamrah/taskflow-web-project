import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Navbar } from './components/navbar';
import { TaskListPage } from './pages/taskListPages';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { type Task } from './types/Task';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 1. GET ALL TASKS: Backend se tasks lekar aane ke liye
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks from server");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  // Jab page pehli baar load hoga, toh data fetch hoga
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. DELETE TASK: Backend par delete request bhejne ke liye
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Agar backend se delete ho gaya, toh state se bhi nikal do
        setTasks(tasks.filter(task => task._id !== id));
        alert("Task deleted successfully! 🗑️");
      } else {
        alert("Failed to delete task from server");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 3. ADD TASK: Backend par naya task bhejkar save karne ke liye
  const handleAddTask = async (newTaskData: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
        alert("Task created successfully! 🎉");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`); // Backend validation error dikhayega
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TaskListPage tasks={tasks} onDelete={handleDeleteTask} />} />
            <Route path="/create" element={<CreateTaskPage onSaveTask={handleAddTask} editingTask={null} setEditingTask={() => {}} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
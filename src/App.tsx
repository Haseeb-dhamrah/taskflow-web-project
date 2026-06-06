import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Navbar } from './components/navbar';
import { TaskListPage } from './pages/taskListPages';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { type Task } from './types/Task';
import { initialTasks } from './data/mockTasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
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
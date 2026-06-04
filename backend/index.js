const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory Database (Mock Data)
let tasks = [
  { id: "1", title: "Setup Project", description: "Backend and Frontend integration", status: "Done", priority: "High", createdAt: new Date() },
  { id: "2", title: "Design UI", description: "Create Kanban and List views", status: "In Progress", priority: "Medium", createdAt: new Date() }
];

// 1. POST /api/tasks - Create Task (With Validation - List B)
// 1. POST /api/tasks - Create Task (With Validation - List B)
app.post('/api/tasks', (req, res) => {
  const { title, description, status, priority } = req.body;

  // --- Backend Validation ---
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and cannot be empty!" });
  }
  if (status && !['Todo', 'In Progress', 'Done'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value!" });
  }
  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value!" });
  }

  const newTask = {
    id: Date.now().toString(),
    title: title,
    description: description ? description : "", // Yeh sahi tarika hai syntax ka object ke andar
    status: status || 'Todo',
    priority: priority || 'Low',
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 2. GET /api/tasks - Get All or Filter by Status (Product Feature)
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  
  // --- Filter by Status Logic ---
  if (status && status !== 'All') {
    const filteredTasks = tasks.filter(t => t.status === status);
    return res.json(filteredTasks);
  }

  res.json(tasks);
});

// 3. DELETE /api/tasks/:id - Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found!" });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully!" });
});

// Base Route
app.get('/', (req, res) => {
  res.send('TaskFlow Mock Backend Server is Running!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  console.log(`Database Status: Running smoothly in Mock Mode! 🎉`);
});
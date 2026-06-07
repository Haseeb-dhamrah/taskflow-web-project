const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// 1. POST /api/tasks - Create Task
app.post('/api/tasks', async (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required!" });
  }
  if (status && !['Todo', 'In Progress', 'Done'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value!" });
  }
  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value!" });
  }

  try {
    const newTask = new Task({ title, description, status, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Server error!" });
  }
});

// 2. GET /api/tasks - Get All or Filter by Status
app.get('/api/tasks', async (req, res) => {
  const { status } = req.query;
  try {
    let query = {};
    if (status && status !== 'All') {
      if (!['Todo', 'In Progress', 'Done'].includes(status)) {
        return res.status(400).json({ error: "Invalid status value!" });
      }
      query.status = status;
    }
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error!" });
  }
});

// 3. DELETE /api/tasks/:id - Delete Task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }
    res.json({ message: "Task deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error!" });
  }
});

// Base Route
app.get('/', (req, res) => {
  res.send('TaskFlow Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
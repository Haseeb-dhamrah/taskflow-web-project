const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 1. POST /tasks - Naya task create karne ke liye (With Validation)
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // --- QUALITY FEATURE: Backend Validation ---
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required and cannot be empty!" });
    }

    if (status && !['Todo', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value! Must be Todo, In Progress, or Done." });
    }

    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value! Must be Low, Medium, or High." });
    }
    // -------------------------------------------

    const newTask = new Task({ title, description, status, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error while creating task." });
  }
});

// 2. GET /tasks - Saare tasks dekhne ya status se filter karne ke liye
router.get('/tasks', async (req, res) => {
  try {
    const { status } = req.query; // Query parameter read karein (?status=Done)

    let filter = {};
    
    // --- PRODUCT FEATURE: Filter by Status ---
    if (status && status !== 'All') {
      filter.status = status;
    }
    // -----------------------------------------

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching tasks." });
  }
});

// 3. DELETE /tasks/:id - Kisi aik task ko delete karne ke liye
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting task." });
  }
});

module.exports = router;
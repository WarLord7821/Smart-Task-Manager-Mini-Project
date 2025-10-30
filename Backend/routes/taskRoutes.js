// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { STATUSES_OBJ } = require('../helper/constants');

// GET /api/tasks: Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/tasks: Create a new task
router.post('/', async (req, res) => {
    const { name, priority, dueDate } = req.body;
    // Note: status is defaulted to 'ADDED'
    const task = new Task({ name, priority, dueDate });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/tasks/:id: Update an existing task (for status change/drag-and-drop)
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
        
        // Only update fields that are provided
        if (req.body.name != null) task.name = req.body.name;
        if (req.body.priority != null) task.priority = req.body.priority;
        if (req.body.dueDate != null) task.dueDate = req.body.dueDate;
        if (req.body.status != null) task.status = req.body.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/tasks/:id: Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
        res.json({ message: 'Deleted Task' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
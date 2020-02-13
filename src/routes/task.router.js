const express = require('express');
const router = new express.Router();
const taskController = require('./../controllers/task.controller');
const authMiddleware = require('./../middleware/auth.middleware');

router.get('/tasks', authMiddleware, taskController.fetchTasks);
router.get('/tasks/:id', authMiddleware, taskController.fetchTaskById);
router.post('/tasks', authMiddleware, taskController.createTask);
router.patch('/tasks/:id', authMiddleware, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, taskController.removeTask);

module.exports = router;

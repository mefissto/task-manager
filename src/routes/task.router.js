const express = require('express');
const router = new express.Router();
const taskController = require('./../controllers/task.controller');

router.get('/tasks', taskController.fetchTasks);
router.get('/tasks/:id', taskController.fetchTaskById);
router.post('/tasks', taskController.createTask);
router.patch('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.removeTask);

module.exports = router;

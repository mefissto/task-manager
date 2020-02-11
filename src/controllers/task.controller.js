const Task = require('../models/task.model');
const paramsValidator = require('./../helpers/helper-validator');

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTask = async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTask = async (req, res) => {
  const isValidOperation = paramsValidator(req.body, Task);

  if (!isValidOperation) {
    return res.status(418).send({ error: 'Invalid property name' });
  }

  try {
    const task = Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns new updated task
      runValidators: true // runs validaion for task updating
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(400).send();
  }
};

const removeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  removeTask
};

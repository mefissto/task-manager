const Task = require('../models/task.model');
const paramsValidator = require('./../helpers/helper-validator');

const fetchTasks = async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'; // cause query is always a string
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate(); // get related to user tasks
    res.send(req.user.tasks);

    // or
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTask = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

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
    const task = await Task.findById({
      _id: req.params.id,
      owner: req.user._id
    });

    // const task = Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true, // returns new updated task
    //   runValidators: true // runs validaion for task updating
    // });

    if (!task) {
      return res.status(404).send();
    }

    Object.assign(task, req.body);
    task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send();
  }
};

const removeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

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

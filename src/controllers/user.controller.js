const User = require('../models/user.model');
const paramsValidator = require('./../helpers/helper-validator');

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req, res) => {
  const isValidOperation = paramsValidator(req.body, User);

  if (!isValidOperation) {
    return res.status(418).send({ error: 'Invalid property name' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns new updated user
      runValidators: true // runs validaion for user updating
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send();
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  removeUser
};

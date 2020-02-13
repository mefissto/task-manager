const User = require('../models/user.model');
const paramsValidator = require('./../helpers/helper-validator');

const fetchMyProfile = async (req, res) => {
  res.send(req.user);
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

const updateUser = async (req, res) => {
  const isValidOperation = paramsValidator(req.body, User);

  if (!isValidOperation) {
    return res.status(418).send({ error: 'Invalid property name' });
  }

  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true, // returns new updated user
    //   runValidators: true // runs validaion for user updating
    // });

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
  fetchMyProfile,
  fetchUserById,
  updateUser,
  removeUser
};

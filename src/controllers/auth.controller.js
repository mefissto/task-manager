const User = require('../models/user.model');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const registration = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  login,
  registration
};

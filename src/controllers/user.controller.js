const User = require('../models/user.model');
const paramsValidator = require('./../helpers/helper-validator');
const sharp = require('sharp');

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

    /**
     * if we have user variable we can use  user.remove()  indtead of finding
     */

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const uploadAvatar = async (req, res) => {
  // req.user.avatar = req.file.buffer;

  const buffer = await sharp(req.file.buffer)
    .resize({
      // sets a custom size if need
      width: 250,
      height: 250
    })
    .png() // converts to png
    .toBuffer();

  req.user.avatar = avatar;
  await req.user.save();
  res.send();
};

const removeAvatar = async (req, res) => {
  try {
    await req.user.update({
      $unset: { avatar: undefined }
    });

    res.send(req.user);
  } catch (error) {
    return res.status(400).send();
  }
};

const fetchAvatarByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log('user: ', user);

    if (!user || !user.avatar) {
      throw new Error('User not found or does not have any avatar');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
};

module.exports = {
  fetchMyProfile,
  fetchUserById,
  updateUser,
  removeUser,
  uploadAvatar,
  removeAvatar,
  fetchAvatarByUser
};

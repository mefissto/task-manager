const express = require('express');
const router = new express.Router();
const userController = require('./../controllers/user.controller');

router.get('/users', userController.fetchUsers);
router.get('/users/:id', userController.fetchUserById);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.removeUser);

module.exports = router;

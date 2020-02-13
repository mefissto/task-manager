const express = require('express');
const router = new express.Router();
const userController = require('./../controllers/user.controller');
const authMiddleware = require('./../middleware/auth.middleware');

router.get('/users/me', authMiddleware, userController.fetchMyProfile);
router.get('/users/:id', authMiddleware, userController.fetchUserById);
router.patch('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.removeUser);

module.exports = router;

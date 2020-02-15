const express = require('express');
const router = new express.Router();
const userController = require('./../controllers/user.controller');
const authMiddleware = require('./../middleware/auth.middleware');
const uploadMiddleware = require('./../middleware/file-upload.middleware');

router.get('/users/me', authMiddleware, userController.fetchMyProfile);
router.get('/users/:id', authMiddleware, userController.fetchUserById);
router.patch('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.removeUser);
router.post('/users/me/avatar', authMiddleware, uploadMiddleware('avatar'), userController.uploadAvatar);
router.delete('/users/me/avatar', authMiddleware, userController.removeAvatar);
router.get('/users/:id/avatar', authMiddleware, userController.fetchAvatarByUser);

module.exports = router;

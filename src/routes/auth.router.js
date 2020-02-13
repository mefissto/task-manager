const express = require('express');
const router = new express.Router();
const authController = require('./../controllers/auth.controller');
const authMiddleware = require('./../middleware/auth.middleware');

router.post('/auth/login', authController.login);
router.post('/auth/registration', authController.registration);
router.post('/auth/logout',authMiddleware, authController.logout);
router.post('/auth/logoutAll',authMiddleware, authController.logoutAll);

module.exports = router;

const express = require('express');
const router = new express.Router();
const authController = require('./../controllers/auth.controller');

router.post('/auth/login', authController.login);
router.post('/auth/registration', authController.registration);

module.exports = router;

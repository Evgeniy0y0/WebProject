const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const protect = require('../middleware/protect');
const validate = require('../utils/validate');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const AppError = require('../utils/AppError');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.post('/logout', authController.logout);

module.exports = router;
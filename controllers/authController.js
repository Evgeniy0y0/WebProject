const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');
const User = require('../models/User');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

exports.register = catchAsync(async (req, res) => {
    const user = await authService.registerUser(req.body);
    const token = generateToken(user._id, user.role);

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email }
    });
});

exports.login = catchAsync(async (req, res) => {
    const user = await authService.loginUser(req.body);
    const token = generateToken(user._id, user.role);

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email }
    });
});

exports.logout = catchAsync(async (req, res) => {
    res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
});
    res.status(200).json({ success: true, message: 'Logged out' });
});

exports.getMe = catchAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});
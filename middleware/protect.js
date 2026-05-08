const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Access denied. No token provided', 401));
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new AppError('Token expired. Please login again', 401));
        }
        if (err.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token. Please login again', 401));
        }
        return next(err);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('User not found', 401));
    }

    req.user = user;
    next();
});

module.exports = protect;
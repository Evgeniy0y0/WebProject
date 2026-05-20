const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Ви не авторизовані. Будь ласка, увійдіть в систему.', 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new AppError('Термін дії токена закінчився. Увійдіть знову', 401));
        }
        if (err.name === 'JsonWebTokenError') {
            return next(new AppError('Невірний токен. Увійдіть знову', 401));
        }
        return next(err);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('Користувача, який володіє цим токеном, більше не існує', 401));
    }

    req.user = user;
    next();
});

module.exports = protect;
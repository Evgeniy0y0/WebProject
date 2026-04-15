class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // помилка, яку ми свідомо створили
    }
}

module.exports = AppError;
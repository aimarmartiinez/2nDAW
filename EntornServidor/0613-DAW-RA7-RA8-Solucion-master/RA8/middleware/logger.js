/**
 * SOLUCIÓ TODO 4: Middleware de logging
 */
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

module.exports = logger;

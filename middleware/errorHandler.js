const logger = require('../utils/logger');


const errorHandler = (err, req, res, next) => {
logger.error(err);
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Server error' });
};


module.exports = errorHandler;
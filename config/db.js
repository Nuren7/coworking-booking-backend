const mongoose = require('mongoose');
const logger = require('../utils/logger');


const connectDB = async (mongoUri) => {
try {
await mongoose.connect(mongoUri, { autoIndex: true });
logger.info('MongoDB connected');
} catch (err) {
logger.error('MongoDB connection error', err);
throw err;
}
};


module.exports = connectDB;
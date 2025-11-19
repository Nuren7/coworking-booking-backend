const { createClient } = require('redis');
const logger = require('../utils/logger');


let client;


const initRedis = async (redisUrl) => {
client = createClient({ url: redisUrl });
client.on('error', (err) => logger.error('Redis Client Error', err));
await client.connect();
logger.info('Redis connected');
return client;
};


const getRedisClient = () => client;


module.exports = { initRedis, getRedisClient };
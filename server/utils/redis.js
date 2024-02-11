const { createClient } = require('redis');

require('dotenv').config();
const ENV = process.env.ENV;
const REDIS_URL = process.env.REDIS_URL || '';

let redisClient;

if (ENV === 'prod') redisClient = createClient({ url: `${REDIS_URL}` });
else redisClient = createClient();

redisClient.on('error', error => console.log('Redis Client Error', error));

module.exports = redisClient;

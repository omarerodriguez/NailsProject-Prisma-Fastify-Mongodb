const Redis = require('ioredis');
require('dotenv').config();

const {
  REDIS_URL
} = process.env;

const renderRedis = new Redis(REDIS_URL);

console.log("Connected to Render Redis! 🚀");

module.exports = {renderRedis}
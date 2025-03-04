// File: config/config.js

require('dotenv').config();

module.exports = {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    // Add other config variables as needed
};

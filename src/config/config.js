// File: config/config.js

require('dotenv').config();

module.exports = {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Add other config variables as needed
};

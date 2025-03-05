// File: src/config/config.js
// Configuration file for environment variables

import dotenv from 'dotenv';
dotenv.config();

export default {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Add other config variables as needed
};

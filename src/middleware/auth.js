// File: src/middleware/auth.js
// Middleware for verifying Supabase JWT token in API routes

import { createClient } from '@supabase/supabase-js';
import config from '@/config/config';

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export async function verifyToken(req, res, next) {
    // Expect token in Authorization header: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'No authorization header provided' });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Invalid authorization header' });
        return;
    }

    const { data: user, error } = await supabase.auth.api.getUser(token);
    if (error || !user) {
        res.status(401).json({ error: 'Unauthorized access' });
        return;
    }

    // Store user info in request for further use
    req.user = user;
    next();
}

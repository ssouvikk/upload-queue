// File: src/pages/api/stats.js
// API route for fetching aggregated statistics

import { getStats } from '@/controllers/statsController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getStats(req, res);
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}

// File: src/pages/api/stats/[jobId].js
// API route for fetching statistics for a specific job

import { getJobStats } from '@/controllers/statsController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Access jobId from req.query (or req.params based on Next.js version)
        await getJobStats(req, res);
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
}

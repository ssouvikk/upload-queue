// File: src/pages/api/queue-status.js
// API route for fetching BullMQ queue status

import nextConnect from 'next-connect';
import { getQueueStatus } from '@/services/queueService';

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error('Queue Status API Error:', error);
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get(async (req, res) => {
    try {
        const status = await getQueueStatus();
        res.status(200).json(status);
    } catch (error) {
        console.error('Error in getting queue status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default apiRoute;

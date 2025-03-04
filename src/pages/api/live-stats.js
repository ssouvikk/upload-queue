// File: src/pages/api/live-stats.js
// API route for broadcasting live statistics via Server-Sent Events (SSE)

export default function handler(req, res) {
    // Only allow GET method for SSE
    if (req.method !== 'GET') {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
        return;
    }

    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });

    // Function to send data to client
    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // For demonstration: simulate sending live updates every 5 seconds
    const intervalId = setInterval(() => {
        // In real scenario, this data might come from BullMQ events or similar
        sendEvent({ message: 'Live update', timestamp: new Date().toISOString() });
    }, 5000);

    // Clean up on client disconnect
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
}

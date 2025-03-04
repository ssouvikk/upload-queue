// File: pages/dashboard.js
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket('ws://localhost:3000/api/live-stats');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Append the new message to the updates state
            setUpdates((prev) => [...prev, message]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Cleanup on component unmount
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Dashboard</h1>
            <ul>
                {updates.map((update, index) => (
                    <li key={index}>
                        {update.jobId}: {update.status} - {update.details}
                    </li>
                ))}
            </ul>
        </div>
    );
}

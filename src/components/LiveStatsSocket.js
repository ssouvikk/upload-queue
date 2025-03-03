// components/LiveStatsSocket.js
import { useEffect } from 'react';

const LiveStatsSocket = ({ onMessage }) => {
    useEffect(() => {
        // Create a new WebSocket connection to /api/live-stats endpoint
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const socketUrl = `${protocol}://${window.location.host}/api/live-stats`;
        const socket = new WebSocket(socketUrl);

        socket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        // Clean up the socket when component unmounts
        return () => {
            socket.close();
        };
    }, [onMessage]);

    return null;
};

export default LiveStatsSocket;

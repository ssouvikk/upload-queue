// File: src/context/LiveStatsContext.js

import React, { createContext, useState, useEffect } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

// Get WebSocket URL from environment variables or fallback to default
const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/live-stats';

export const LiveStatsContext = createContext();

export const LiveStatsProvider = ({ children }) => {
    // Connect to the WebSocket endpoint using the configurable URL
    const { data, error, isConnected } = useWebSocket(wsUrl);
    const [liveStats, setLiveStats] = useState([]);

    useEffect(() => {
        if (data) {
            // Prepend new data to the liveStats array
            setLiveStats(prevStats => [data, ...prevStats]);
        }
    }, [data]);

    return (
        <LiveStatsContext.Provider value={{ liveStats, error, isConnected }}>
            {children}
        </LiveStatsContext.Provider>
    );
};

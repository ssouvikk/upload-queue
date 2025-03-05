// File: src/context/LiveStatsContext.js
// Context for managing live statistics from WebSocket using ES module syntax

import React, { createContext, useState, useEffect } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

export const LiveStatsContext = createContext();

export const LiveStatsProvider = ({ children }) => {
    // Connect to the WebSocket endpoint for live stats
    const { data, error, isConnected } = useWebSocket('ws://localhost:3000/api/live-stats');
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

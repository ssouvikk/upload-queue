// File: src/hooks/useWebSocket.js

import { useState, useEffect } from 'react'

function useWebSocket(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                setData(message);
            } catch (e) {
                setError(e);
            }
        };

        ws.onerror = (err) => {
            setError(err);
        };

        ws.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return { data, error, isConnected };
}

export default useWebSocket;

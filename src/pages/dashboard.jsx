// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import FileUpload from '../components/FileUpload';
import StatsTable from '../components/StatsTable';
import LiveStatsSocket from '../components/LiveStatsSocket';
import Login from '../components/Login';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState([]);
    const [uploadResponse, setUploadResponse] = useState(null);

    // Check for an authenticated user on component mount
    useEffect(() => {
        const session = supabase.auth.session();
        if (session && session.user) {
            setUser(session.user);
        }
        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session && session.user) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    // Handler for real-time updates from WebSocket
    const handleSocketMessage = (data) => {
        // For demonstration, assume the data contains an updated stats object
        console.log('Received live stats:', data);
        // Update stats state (e.g., prepend new stats)
        setStats((prevStats) => [data, ...prevStats]);
    };

    // Logout handler
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // If user is not logged in, render the Login component
    if (!user) {
        return <Login onLogin={(user) => setUser(user)} />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Log Processing Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {/* File Upload Component */}
            <FileUpload onUploadSuccess={(response) => setUploadResponse(response)} />

            {/* WebSocket Component for Real-Time Stats */}
            <LiveStatsSocket onMessage={handleSocketMessage} />

            {/* Dynamic Table to Display Aggregated Statistics */}
            <StatsTable stats={stats} />
        </div>
    );
};

export default Dashboard;

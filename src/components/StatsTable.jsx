// components/StatsTable.js
import React from 'react';

const StatsTable = ({ stats }) => {
    if (!stats || stats.length === 0) {
        return <p>No stats available.</p>;
    }

    return (
        <div>
            <h3>Aggregated Log Statistics</h3>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>File ID</th>
                        <th>Processed At</th>
                        <th>Error Count</th>
                        <th>Keyword Matches</th>
                        <th>IP Addresses</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.file_id}</td>
                            <td>{new Date(stat.processed_at).toLocaleString()}</td>
                            <td>{stat.error_count}</td>
                            <td>{stat.keyword_matches}</td>
                            <td>{stat.ip_addresses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsTable;

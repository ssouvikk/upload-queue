// File: components/DashboardTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const DashboardTable = ({ stats }) => {
    return (
        <div className="table-responsive">
            <Table striped bordered hover>
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
                            <td>{stat.processed_at}</td>
                            <td>{stat.error_count}</td>
                            <td>{stat.keyword_matches}</td>
                            <td>{stat.ip_addresses}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DashboardTable;

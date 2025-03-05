// File: components/DashboardTable.js

const DashboardTable = ({ stats }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">File ID</th>
                        <th className="py-2 px-4 border-b">Processed At</th>
                        <th className="py-2 px-4 border-b">Error Count</th>
                        <th className="py-2 px-4 border-b">Keyword Matches</th>
                        <th className="py-2 px-4 border-b">IP Addresses</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{stat.file_id}</td>
                            <td className="py-2 px-4 border-b">{stat.processed_at}</td>
                            <td className="py-2 px-4 border-b">{stat.error_count}</td>
                            <td className="py-2 px-4 border-b">{stat.keyword_matches}</td>
                            <td className="py-2 px-4 border-b">{stat.ip_addresses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;

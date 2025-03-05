// File: pages/dashboard.js
import { withAuth } from '@/utils/withAuth';
const Dashboard = () => {
    return (
        <div>
            <h1>DashBoard</h1>
        </div>
    );
}

export default withAuth(Dashboard)
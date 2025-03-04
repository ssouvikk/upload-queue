// components/Sidebar.js
import Link from 'next/link'

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-100 p-4 hidden md:block" style={{ backgroundColor: '#8ba1e2' }}>
            <ul>
                <li className="mb-2">
                    <Link href="/" className="text-gray-700 hover:text-blue-500">
                        Dashboard
                    </Link>
                </li>
                {/* Add other links */}
            </ul>
        </aside>
    )
}

export default Sidebar
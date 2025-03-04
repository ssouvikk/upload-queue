// File: components/Navbar.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { supabase } from '@/utils/supabaseClient';

const Navbar = () => {
    const { setAuthData } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        // Call Supabase signOut method
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error('Logout failed');
            return;
        }
        // Update AuthContext and remove session from localStorage
        setAuthData(null);
        localStorage.removeItem('supabaseSession');
        toast('Logged out successfully');
        router.push('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-lg font-bold">Task Manager</div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <button
                    onClick={() => router.push('/notifications')}
                    className="text-white hover:underline focus:outline-none"
                >
                    Notifications
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

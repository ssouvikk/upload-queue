// File: pages/register.js
import { useState, useEffect, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authData } = useContext(AuthContext);
    const router = useRouter();

    // Redirect immediately if user is already logged in
    useEffect(() => {
        if (authData && authData.user) {
            router.replace('/');
        }
    }, [authData, router]);

    // If user is logged in, show Loader to prevent any flicker
    if (authData && authData.user) {
        return <Loader message="Redirecting..." spinnerSize={64} spinnerColor="border-blue-500" />;
    }

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        // Call Supabase auth signUp method with email and password
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Registration successful');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

Register.noLayout = true;
export default Register;

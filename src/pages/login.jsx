// File: pages/login.js
import { useState, useContext, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader'; // import Loader if not already

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authData, setAuthData } = useContext(AuthContext);
    const router = useRouter();

    // Redirect if user is already logged in and show Loader until redirection
    useEffect(() => {
        if (authData && authData.user) {
            router.replace(router.query.redirect || '/');
        }
    }, [authData, router]);

    // If user is logged in, show Loader to prevent flicker of login page
    if (authData && authData.user) {
        return <Loader message="Redirecting..." spinnerSize={64} spinnerColor="border-blue-500" />;
    }

    // Function to handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        // Call Supabase auth signIn method with email and password
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            // Successful login; update context and store session in localStorage
            setAuthData(data.session);
            localStorage.setItem('supabaseSession', JSON.stringify(data.session));
            toast.success('Login successful');
            router.push('/');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

Login.noLayout = true;
export default Login;

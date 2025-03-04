// File: pages/login.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Function to handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // Redirect to dashboard or set authenticated state
            console.log('Login successful', user);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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

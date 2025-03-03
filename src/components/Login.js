// components/Login.js
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const { error, user } = await supabase.auth.signIn({ email, password });
        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            onLogin(user);
        }
    };

    // Handle OAuth login (e.g., GitHub)
    const handleOAuthLogin = async (provider) => {
        const { error } = await supabase.auth.signIn({ provider });
        if (error) {
            console.error(`Error with ${provider} login:`, error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleEmailLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Login</button>
            </form>
            <hr />
            <button onClick={() => handleOAuthLogin('github')} style={{ marginTop: '10px' }}>
                Login with GitHub
            </button>
        </div>
    );
};

export default Login;

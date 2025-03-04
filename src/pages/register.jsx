// File: pages/register.js
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import exp from 'constants';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        // Call Supabase auth signUp method with email and password
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message);
            setMessage(null);
        } else {
            // Successful registration; instruct user to check email for confirmation
            setMessage('Registration successful. Please check your email for confirmation.');
            setError(null);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {/* Display error message if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Display success message if registration is successful */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
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
}

Register.noLayout = true;

export default Register;
// File: pages/register.js
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        // Call Supabase auth signUp method with email and password
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            toast.error(error.message);
            setMessage('');
        } else {
            setMessage('Registration successful. Please check your email for confirmation.');
            toast.success('Registration successful');
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
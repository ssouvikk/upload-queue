// File: src/pages/register.js
import { useState, useEffect, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Registration successful');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="primary" className="w-full">
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
};

Register.noLayout = true;
export default Register;

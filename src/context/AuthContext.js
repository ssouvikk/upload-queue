// File: context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Loader from '@/components/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for persisted session immediately
        const storedSession = localStorage.getItem('supabaseSession');
        if (storedSession) {
            setAuthData(JSON.parse(storedSession));
            setLoading(false);
        } else {
            setLoading(false);
        }

        // Get latest session from Supabase in background
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setAuthData(session);
            // Persist session if available
            if (session) {
                localStorage.setItem('supabaseSession', JSON.stringify(session));
            } else {
                localStorage.removeItem('supabaseSession');
            }
        };

        getInitialSession();

        // Listen for authentication state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setAuthData(session);
            if (session) {
                localStorage.setItem('supabaseSession', JSON.stringify(session));
            } else {
                localStorage.removeItem('supabaseSession');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        // Show loader until loading is complete
        return <Loader message="Loading..." spinnerSize={64} spinnerColor="border-blue-500" />;
    }

    return (
        <AuthContext.Provider value={{ authData, setAuthData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

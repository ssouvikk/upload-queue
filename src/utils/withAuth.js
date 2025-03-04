// File: utils/withAuth.js
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import Loader from '@/components/Loader';

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const { authData } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            // If no user in session, redirect to login page
            if (authData && !authData.user) {
                router.replace(`/login?redirect=${router.pathname}`);
            }
        }, [authData, router]);

        if (!authData || !authData.user) {
            return <Loader message="Authenticating..." spinnerSize={64} spinnerColor="border-blue-500" />;
        }

        return <Component {...props} />;
    };
}

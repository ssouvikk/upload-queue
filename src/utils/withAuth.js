// File: utils/withAuth.js

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Loader from '@/components/Loader';

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const { authData, loading } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            // After loading, if user is not authenticated, redirect to login page
            if (!loading && (!authData || !authData.user)) {
                router.replace(`/login?redirect=${router.pathname}`);
            }
        }, [authData, loading, router]);

        // Show Loader until authentication status is confirmed
        if (loading || !authData || !authData.user) {
            return <Loader message="Authenticating..." spinnerSize={64} spinnerColor="border-blue-500" />;
        }

        return <Component {...props} />;
    };
}

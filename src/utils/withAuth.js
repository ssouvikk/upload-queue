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
            // If authData is not loading and user is not logged in, redirect to login page
            if (authData !== null && (!authData || !authData.user)) {
                router.replace(`/login?redirect=${router.pathname}`);
            }
        }, [authData, router]);

        // If authData is null or user is not available, show Loader
        if (!authData || !authData.user) {
            return <Loader message="Authenticating..." spinnerSize={64} spinnerColor="border-blue-500" />;
        }

        return <Component {...props} />;
    };
}

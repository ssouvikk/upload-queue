// File: pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Router from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// This is the main App component with global providers and a route change loader.
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  // Global loader for route changes.
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const getLayout = Component.noLayout ? (page) => page : (page) => <Layout>{page}</Layout>;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {loading && (
          <Loader message="Loading..." spinnerSize={64} spinnerVariant="primary" />
        )}
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer position="top-right" autoClose={5000} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;

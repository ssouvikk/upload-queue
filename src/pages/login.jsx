// File: pages/login.js
import { useState, useContext, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { CustomButton, CustomInput, CustomCard } from '@/components/ui';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authData, setAuthData } = useContext(AuthContext);

    const router = useRouter();

    // Redirect immediately if user is already logged in
    useEffect(() => {
        if (authData && authData.user) {
            router.replace(router.query.redirect || '/');
        }
    }, [authData, router]);

    // If user is logged in, show Loader to prevent any flicker
    if (authData && authData.user) {
        return <Loader message="Redirecting..." spinnerSize={64} spinnerColor="border-primary" />;
    }

    // Function to handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            setAuthData(data.session);
            localStorage.setItem('supabaseSession', JSON.stringify(data.session));
            toast.success('Login successful');
            router.push('/');
        }
        setIsLoading(false);
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <CustomCard title="Login">
                        <Form onSubmit={handleLogin}>
                            <CustomInput
                                type="email"
                                label="Email address"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <CustomInput
                                type="password"
                                label="Password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <CustomButton type="submit" className="w-100" loading={isLoading}>
                                Login
                            </CustomButton>
                        </Form>
                    </CustomCard>
                </Col>
            </Row>
        </Container>
    );
};

Login.noLayout = true;
export default Login;

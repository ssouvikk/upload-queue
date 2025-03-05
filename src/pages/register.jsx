// File: src/pages/register.js
import { useState, useEffect, useContext } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { CustomButton, CustomInput, CustomCard } from '@/components/ui';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authData } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Redirect immediately if user is already logged in
    useEffect(() => {
        if (authData && authData.user) {
            router.replace('/');
        }
    }, [authData, router]);

    // If user is logged in, show Loader to prevent any flicker
    if (authData && authData.user) {
        return <Loader message="Redirecting..." spinnerSize={64} spinnerColor="border-primary" />;
    }

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state when form is submitted
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Registration successful');
        }
        setIsLoading(false); // Reset loading state after API call
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <CustomCard title="Register">
                        <Form onSubmit={handleRegister}>
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
                            <CustomButton type="submit" className="w-100" loading={isLoading} >
                                Register
                            </CustomButton>
                        </Form>
                    </CustomCard>
                </Col>
            </Row>
        </Container>
    );
};

Register.noLayout = true;
export default Register;

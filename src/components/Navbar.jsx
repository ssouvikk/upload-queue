// File: components/Navbar.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { supabase } from '@/utils/supabaseClient';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { CustomButton } from '@/components/ui';

const AppNavbar = () => {
    const { setAuthData } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        supabase.auth.signOut();
        setAuthData(null);
        localStorage.removeItem('supabaseSession');
        toast('Logged out successfully');
        router.push('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="sm" className="mb-3">
            <Container fluid>
                <Navbar.Brand>File Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <CustomButton variant="danger" onClick={handleLogout} className="ms-2">
                            Logout
                        </CustomButton>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;

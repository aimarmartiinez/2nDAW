import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const tema = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', tema);
        localStorage.setItem('tema_guardat', tema);
    }, [darkMode]);

    useEffect(() => {
        const temaRecuperat = localStorage.getItem('tema_guardat');
        if (temaRecuperat === 'dark') {
            setDarkMode(true);
        }
    }, []);

    // Active Link
    const styleActiveLink = (path: string) => {
        return currentPath === path ? 'text-primary fw-bold' : '';
    };

    // Active link item dropdown
    const styleDropdownItem = (path: string) => {
        return currentPath === path ? 'text-primary fw-bold bg-transparent' : '';
    };

    return (
        <BootstrapNavbar expand="lg" className="bg-body-tertiary sticky-top shadow-sm py-3">
            <Container>
                <BootstrapNavbar.Toggle aria-controls="menu-principal" className="order-1" />

                <BootstrapNavbar.Collapse id="menu-principal" className="order-3 order-lg-2 justify-content-center">
                    <Nav className="text-center fw-medium">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`mx-2 ${styleActiveLink('/')}`}
                        >
                            Inici
                        </Nav.Link>

                        <NavDropdown
                            title={
                                <span className={currentPath.startsWith('/m06') ? 'text-primary fw-bold' : ''}>
                                    Entorn Client (M06)
                                </span>
                            }
                            id="dropdown-m06"
                            className="mx-2"
                        >
                            <NavDropdown.Item as={Link} to="/m06-ra1-ra2" className={styleDropdownItem('/m06-ra1-ra2')}>RA1-RA2</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/m06-ra3-ra5-ra6" className={styleDropdownItem('/m06-ra3-ra5-ra6')}>RA3-RA5-RA6</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/m06-ra4" className={styleDropdownItem('/m06-ra4')}>RA4</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/m06-ra7" className={styleDropdownItem('/m06-ra7')}>RA7</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title={
                                <span className={currentPath.startsWith('/m09') ? 'text-primary fw-bold' : ''}>
                                    Disseny d'interficies web (M09)
                                </span>
                            }
                            id="dropdown-m09"
                            className="mx-2"
                        >
                            <NavDropdown.Item as={Link} to="/m09-ra1-ra2" className={styleDropdownItem('/m09-ra1-ra2')}>RA1-RA2</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/m09-ra5-ra6" className={styleDropdownItem('/m09-ra5-ra6')}>RA5-RA6</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BootstrapNavbar.Collapse>

                <div className="d-flex align-items-center gap-2 order-2 order-lg-3">
                    {darkMode ? (
                        <i title="Mode fosc activat" className="bi bi-moon-stars-fill text-info fs-4"></i>
                    ) : (
                        <i title="Mode clar activat" className="bi bi-sun-fill text-warning fs-4"></i>
                    )}
                    <Form.Check
                        type="switch"
                        id="theme-switch"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? 'Passar a mode clar' : 'Passar a mode fosc'}
                    />
                </div>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;

import React from 'react';
import {Container, Navbar, Nav, Row, Col, NavItem} from 'react-bootstrap';
import './Layout.css';
import {Avatar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";

const Layout = ({
                    username = '',
                    userRole = null,
                    children,
                    logoutHandler = () => console.log('logout'),
}) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
                <Container>
                    <Avatar>{username[0]}</Avatar>
                    <Typography sx={{
                        minWidth: 50,
                        color: '#ccc'
                    }}>{username}</Typography>
                    <Logout fontSize="small" sx={{
                        color: '#ccc',
                        cursor: 'pointer'
                    }} onClick={logoutHandler}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main content */}
            <main className="flex-grow-1">
                <Container fluid className="py-4">
                    {children}
                </Container>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-light py-3">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <p>© 2024 Culinary Blog. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default Layout;

import React from 'react';
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap';
import './Layout.css';
import {Avatar, Chip, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {getRoleDisplayName, Roles} from "../constants/roles";

const Layout = ({
                    username = '',
                    userRole = '',
                    avatarUrl = '',
                    children,
                    logoutHandler = () => console.log('logout'),
}) => {
    const navigate = useNavigate();

    const goToUserProfile = () =>
    {
        navigate('/user/profile');
    }
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
                <Container>
                    {!avatarUrl
                        ? (<Avatar onClick={goToUserProfile} sx={{cursor: 'pointer'}}>{username[0]}</Avatar>)
                        : (<Avatar onClick={goToUserProfile} sx={{cursor: 'pointer'}} src={avatarUrl}/>)
                    }
                    <Typography onClick={goToUserProfile} sx={{
                        minWidth: 50,
                        marginLeft: '1em',
                        marginRight: '0.3em',
                        color: '#ccc',
                        cursor: 'pointer'
                    }}>{username}</Typography>
                    <Chip label={getRoleDisplayName(userRole)} sx={{ marginLeft: '0.2em', marginRight: '1em', userSelect: 'none' }} color='info' variant='outlined'/>
                    <Logout fontSize="small" sx={{
                        color: '#ccc',
                        cursor: 'pointer'
                    }} onClick={logoutHandler}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate("/my-posts")}>My posts</Nav.Link>
                            {userRole !== 'ROLE_ADMIN' ? '' :
                                (<>
                                    <Nav.Link onClick={() => navigate("/user")}>Users</Nav.Link>
                                    <Nav.Link onClick={() => navigate("/all-posts")}>All posts</Nav.Link>
                                </>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main content */}
            <main className="flex-grow-1 h-100">
                <Container fluid className="py-4 px-5">
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

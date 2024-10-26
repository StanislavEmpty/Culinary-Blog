import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Delete, Edit } from "@mui/icons-material";
import {Avatar, Button, Chip, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { getRoleDisplayName } from "../../constants/roles";

const UserListPage = ({username}) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiService.get('/api/users');
                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await apiService.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Активность</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Avatar src={user.avatarUrl || "https://via.placeholder.com/50"} alt="Avatar"/>
                                </td>
                                <td>{user.username} {user.username === username ? '(Вы)' : ''}</td>
                                <td>{user.email}</td>
                                <td>{getRoleDisplayName(user.role)}</td>
                                <td>
                                    {user.isEnabled ? (<Chip label='Активен' color='info' variant='outlined'/>)
                                    : (<Chip label='Не активен' color='danger' variant='outlined'/>)}
                                </td>
                                <td>
                                    {user.username === username ? '' : (
                                        <>
                                            <IconButton onClick={() => navigate("/user/edit/" + user.id)}>
                                                <Edit/>
                                            </IconButton>
                                            <IconButton onClick={() => deleteUser(user.id)}>
                                                <Delete/>
                                            </IconButton>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default UserListPage;

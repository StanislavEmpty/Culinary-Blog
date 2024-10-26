import React, {useEffect, useState} from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import {useNavigate} from "react-router-dom";
import apiService from "../../services/apiService";

const MyPostsPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () =>
        {
            try
            {
                const resp = await apiService.get('/api/posts');
                if(resp.status === 200)
                {
                    setPosts(resp.data)
                }
            }
            catch (e)
            {
                console.error("Fetch error." + e)
            }

        };
        getPosts().catch(e => console.error(e))
    }, []);

    // Удаление поста
    const deletePost = async (id) => {
        try
        {
            await apiService.delete(`/api/posts/${id}`);
        }
        catch (error)
        {
            console.error("Error fetch." + error)
        }
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <Container>
            <Row className="justify-content-start mt-4">
                <Col>
                    <Button variant="outlined" color="success" onClick={() => navigate("/post/create")}>
                        Создать новый
                    </Button>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Длительность приготовления</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, index) => (
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.durationCookingMinutes} minutes</td>
                                <td>
                                    <IconButton onClick={() => navigate("/post/edit/" + post.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deletePost(post.id)}>
                                        <Delete />
                                    </IconButton>
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

export default MyPostsPage;

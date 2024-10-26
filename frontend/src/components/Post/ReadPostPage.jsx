import React, { useEffect, useState } from 'react';
import {Grid, Paper, Chip, Typography, IconButton} from '@mui/material';
import apiService from "../../services/apiService";
import { useParams } from "react-router-dom";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import CommentsSection from "../small-components/CommentsSection";

const defaultImageUrl = 'https://via.placeholder.com/300x300'; // Default image URL

const ReadPostPage = ({username, role}) => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState({
        title: '',
        durationCookingMinutes: '',
        imageUrl: '',
        likes: 0,
        dislikes: 0,
        author: '',
        ingredients: [],
        comments: [],
        stages: []
    });

    useEffect(() => {
        // Fetch existing post data
        const getPostData = async () => {
            try {
                const postResp = await apiService.get(`/api/posts/${id}`);
                if (postResp.status === 200) {
                    setPost(postResp.data);
                    console.log(postResp.data)
                }
            } catch (e) {
                console.log('Error fetching post data: ' + e);
            }
        };
        getPostData();
    }, [id]);

    const handleLike = async () => {
        try {
            await apiService.get(`/api/posts/like/${post.id}`);
        }
        catch (e)
        {
            console.error(e)
        }
        setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }))
    };

    const handleDislike = async () => {
        try {
            await apiService.get(`/api/posts/dislike/${post.id}`);
        } catch (e) {
            console.error(e)
        }
        setPost((prevPost) => ({ ...prevPost, dislikes: prevPost.dislikes + 1 }))
    };

    const setComments = (comments) =>
    {
        setPost((prevPost) => ({ ...prevPost, comments: comments }))
    };

    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3}
                           style={{padding: '16px', display: 'flex', flexDirection: 'column', height: '100%'}}>
                        {/* Image Preview */}
                        <div style={{marginBottom: '16px', textAlign: 'center'}}>
                            <img
                                src={post.imageUrl || defaultImageUrl}
                                alt="Recipe"
                                style={{width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover'}}
                            />
                        </div>

                        <h2>{post.title}</h2>

                        <p>Duration: {post.durationCookingMinutes} minutes</p>

                        <Typography component={'span'} variant="body2" color="text.secondary" style={{marginTop: '10px'}}>
                            <Chip label={'Author: ' + post.author} className={"h3 fw-bold fw2-l"}/>
                        </Typography>

                        <div style={{padding: '10px'}}>
                            <IconButton onClick={handleLike}>
                                <ThumbUp/>
                            </IconButton>
                            <span className="mx-2">{post.likes}</span>
                            <IconButton onClick={handleDislike}>
                                <ThumbDown/>
                            </IconButton>
                            <span className="mx-2">{post.dislikes}</span>
                        </div>

                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <CommentsSection comments={post.comments} setComments={setComments} postId={post.id} username={username} role={role}/>
                        </Paper>
                    </Paper>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{padding: '16px'}}>
                        {/* Ingredients */}
                        <h3>Ingredients</h3>
                        {post.ingredients.length > 0 ? (
                            post.ingredients.map((ingredient) => (
                                <Chip
                                    key={ingredient.id}
                                    label={ingredient.name}
                                    variant="outlined"
                                    style={{ marginRight: '8px', marginBottom: '8px' }}
                                />
                            ))
                        ) : (
                            <p>No ingredients added.</p>
                        )}

                        {/* Stages */}
                        <div style={{ marginTop: '24px' }}>
                            <h3>Stages</h3>
                            {post.stages.length > 0 ? (
                                post.stages.map((stage, index) => (
                                    <Paper
                                        key={stage.id}
                                        elevation={2}
                                        style={{
                                            padding: '12px',
                                            marginBottom: '8px',
                                            fontSize: '1.1rem',
                                            whiteSpace: 'pre-line',
                                        }}>
                                        <strong>{index + 1}. {stage.title}</strong>
                                        <p>{stage.description}</p>
                                    </Paper>
                                ))
                            ) : (
                                <p>No stages added.</p>
                            )}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ReadPostPage;

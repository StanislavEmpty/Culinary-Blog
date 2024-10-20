import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Paper, Chip, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import apiService from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const defaultImageUrl = 'https://via.placeholder.com/300x300'; // Default image URL

const EditPostPage = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    // New state to store individual stage fields
    const [newStageTitle, setNewStageTitle] = useState('');
    const [newStageDescription, setNewStageDescription] = useState('');

    // Post state containing all related fields
    const [post, setPost] = useState({
        title: '',
        durationCookingMinutes: '',
        imageUrl: '',
        ingredients: [],
        stages: []
    });

    useEffect(() => {
        // Fetch existing post data
        const getPostData = async () => {
            try {
                const postResp = await apiService.get(`/api/posts/${id}`);
                if (postResp.status === 200) {
                    setPost(postResp.data);
                }
                const getIngredientsResp = await apiService.get('/api/ingredients');
                if (getIngredientsResp.status === 200) {
                    setIngredients(getIngredientsResp.data);
                }
            } catch (e) {
                console.log('Error fetching data: ' + e);
            }
        };
        getPostData();
    }, [id]);

    const handleAddStage = () => {
        if (newStageTitle.trim() && newStageDescription.trim()) {
            const newStage = {
                id: 'new_' + Date.now(),
                title: newStageTitle,
                description: newStageDescription
            };

            if (editIndex !== null) {
                const updatedStages = post.stages.map((stage, index) =>
                    index === editIndex ? newStage : stage
                );
                setPost((prevPost) => ({ ...prevPost, stages: updatedStages }));
                setEditIndex(null); // Reset edit mode
            } else {
                setPost((prevPost) => ({ ...prevPost, stages: [...prevPost.stages, newStage] }));
            }

            setNewStageTitle(''); // Clear input fields
            setNewStageDescription('');
        }
    };

    const handleEditStage = (index) => {
        const stage = post.stages[index];
        setNewStageTitle(stage.title);
        setNewStageDescription(stage.description);
        setEditIndex(index);
    };

    const handleDeleteStage = (index) => {
        const updatedStages = post.stages.filter((_, i) => i !== index);
        setPost((prevPost) => ({ ...prevPost, stages: updatedStages }));
    };

    const handleIngredientChange = async (event, newValue = []) => {
        if (newValue.length > 0) {
            const lastAdded = newValue[newValue.length - 1];

            if (lastAdded && !lastAdded.id) {
                try {
                    const newIngredient = { name: lastAdded.name || lastAdded, description: "test" };
                    const response = await apiService.post('/api/ingredients', newIngredient);
                    const addedIngredient = response.data;

                    setIngredients([...ingredients, addedIngredient]);
                    newValue[newValue.length - 1] = addedIngredient;
                } catch (e) {
                    console.log('Error: ' + e);
                }
            }
        }
        setPost((prevPost) => ({ ...prevPost, ingredients: newValue }));
    };

    const handleSubmit = async () => {
        post.stages
            .filter(stage => String(stage.id).includes('new'))
            .forEach((stage) => stage.id = 0);

        try {
            const resp = await apiService.put(`/api/posts`, post);
            if (resp.status === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Error updating post: ' + error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Image Preview */}
                        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                            <img
                                src={post.imageUrl || defaultImageUrl}
                                alt="Recipe"
                                style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Image URL Input */}
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            value={post.imageUrl || ''}
                            onChange={(e) => setPost((prevPost) => ({ ...prevPost, imageUrl: e.target.value }))}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={post.title}
                            onChange={(e) => setPost((prevPost) => ({ ...prevPost, title: e.target.value }))}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Duration (minutes)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={post.durationCookingMinutes}
                            onChange={(e) => setPost((prevPost) => ({ ...prevPost, durationCookingMinutes: parseInt(e.target.value) }))}
                            style={{ marginBottom: '16px' }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Update Post
                        </Button>
                    </Paper>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Autocomplete
                            multiple
                            id="ingredients"
                            options={ingredients}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option}
                            isOptionEqualToValue={(option, value) => option.id === value.id || option.name === value.name}
                            freeSolo
                            value={post.ingredients}
                            onChange={handleIngredientChange}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    const tagProps = getTagProps({ index });
                                    return (
                                        <Chip
                                            variant="outlined"
                                            label={option.name || option}
                                            {...tagProps}
                                            key={option.id || index}
                                        />
                                    );
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Ingredients"
                                    placeholder="Select or add ingredients"
                                />
                            )}
                        />

                        {/* Stages Section */}
                        <div style={{ marginTop: '24px' }}>
                            <TextField
                                label="Stage Title"
                                variant="outlined"
                                fullWidth
                                value={newStageTitle}
                                onChange={(e) => setNewStageTitle(e.target.value)}
                                style={{ marginBottom: '16px' }}
                            />
                            <TextField
                                label="Stage Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={newStageDescription}
                                onChange={(e) => setNewStageDescription(e.target.value)}
                                style={{ marginBottom: '16px' }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddStage}>
                                {editIndex !== null ? "Update Stage" : "Add Stage"}
                            </Button>

                            <div style={{ marginTop: '24px' }}>
                                {post.stages.map((stage, index) => (
                                    <Paper
                                        key={stage.id}
                                        elevation={2}
                                        style={{
                                            padding: '12px',
                                            marginBottom: '8px',
                                            fontSize: '1.1rem',
                                            whiteSpace: 'pre-line',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                        <div>
                                            <strong>{index + 1}. {stage.title}</strong>
                                            <p>{stage.description}</p>
                                        </div>
                                        <div>
                                            <IconButton onClick={() => handleEditStage(index)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteStage(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EditPostPage;

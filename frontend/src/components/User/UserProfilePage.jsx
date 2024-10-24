import React, {useEffect, useState} from 'react';
import { TextField, Button, Paper, Avatar, Grid } from '@mui/material';
import apiService from "../../services/apiService";
import {useNavigate} from "react-router-dom";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        avatarUrl: '',
        bio: ''
    });
//https://avatars.mds.yandex.net/i?id=dec8208c2f1600677b329901fb82858bd110b6be-4234302-images-thumbs&n=13
    useEffect(() => {
        const getUserData = async () =>
        {
            try {
                const response = await apiService.get('/api/users/get-current-user');
                if (response.status === 200) {
                    setUser(response.data)
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        getUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await apiService.put('/api/users/' + user.id, user);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Avatar src={user.avatarUrl || 'https://via.placeholder.com/150'} alt="Avatar" style={{ width: 150, height: 150 }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Avatar URL"
                        name="avatarUrl"
                        variant="outlined"
                        fullWidth
                        value={user.avatarUrl}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        value={user.username}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={user.email}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bio"
                        name="bio"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={user.bio}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update Profile
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserProfilePage;

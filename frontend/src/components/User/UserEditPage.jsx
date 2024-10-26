import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Avatar, Grid, FormControlLabel, Checkbox, MenuItem, Select, FormControl } from '@mui/material';
import apiService from "../../services/apiService";
import {useNavigate, useParams} from "react-router-dom";

const UserEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        avatarUrl: '',
        bio: '',
        isEnabled: false,
        role: 'ROLE_USER'
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await apiService.get('/api/users/' + id);
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        getUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: checked
        }));
    };

    const handleSubmit = async () => {
        try {
            await apiService.put('/api/users/' + user.id, user);

            if(user.isEnabled)
                await apiService.post('/api/users/unban/' + user.id);
            else
                await apiService.post('/api/users/ban/' + user.id);

            await apiService.post('/api/users/set-role/' + user.id, {
                role: user.role
            })

            navigate(-1);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Avatar
                        src={user.avatarUrl || 'https://via.placeholder.com/150'}
                        alt="Avatar"
                        style={{ width: 150, height: 150 }}
                        key={user.avatarUrl} // Ключ для обновления аватара
                    />
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
                    <FormControl fullWidth style={{ marginBottom: '16px' }}>
                        <Select
                            name="role"
                            value={user.role}
                            onChange={handleInputChange}>
                            <MenuItem value="ROLE_USER">Пользователь</MenuItem>
                            <MenuItem value="ROLE_ADMIN">Администратор</MenuItem>
                        </Select>
                    </FormControl>
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
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={user.isEnabled}
                                onChange={handleCheckboxChange}
                                name="isEnabled"
                                color="primary"
                            />
                        }
                        label="Is Enabled"
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserEditPage;

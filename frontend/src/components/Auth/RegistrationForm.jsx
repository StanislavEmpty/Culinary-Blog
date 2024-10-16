import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import apiService from "../../services/apiService";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Для отображения/скрытия пароля
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Для отображения/скрытия подтверждения пароля
    const [error, setError] = useState('');

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');

        // Логика отправки данных
        try {
            const result = await apiService.post('/api/auth/sign-up',formData);
            if (result.status === 200) {
                localStorage.setItem('username', formData.username);
                localStorage.setItem('token', result.data.token);
                window.location.replace(window.location.origin);
            }
        } catch (e) {
            if(e.response && e.response.status === 403)
            {
                setError("Invalid username, email or password. Maybe it is exists. Please check and retry!");
            }
            else
            {
                console.log(e.message);
            }
        }

        // Сброс формы
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Box
                p={3}
                boxShadow={3}
                borderRadius={8}
                bgcolor="#fff"
                className="form-container"
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                {error && (
                    <Typography color="error" variant="body2" align="center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                label="Username"
                                name="username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'} // Меняется тип ввода для показа пароля
                                label="Password"
                                name="password"
                                variant="outlined"
                                value={formData.password}
                                onChange={handleFormChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'} // Меняется тип ввода для показа подтверждения пароля
                                label="Confirm Password"
                                name="confirmPassword"
                                variant="outlined"
                                value={formData.confirmPassword}
                                onChange={handleFormChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-3"
                    >
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegistrationForm;

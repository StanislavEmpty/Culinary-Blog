import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchPostModal = ({ open, handleClose }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchDuration, setSearchDuration] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        setSearchTitle('');
        setSearchDuration('');
        handleClose();

        // Perform search based on available inputs
        if (searchTitle && !searchDuration) {
            navigate(`/post/search/title/${searchTitle}`);
        } else if (!searchTitle && searchDuration) {
            navigate(`/post/search/duration/${searchDuration}`);
        } else {
            // If nothing is entered, just close
            console.log('Please enter a search term');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Search Posts</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Duration (minutes)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={searchDuration}
                    onChange={(e) => setSearchDuration(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSearch} color="primary">
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchPostModal;

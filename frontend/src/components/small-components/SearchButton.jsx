import React from 'react';
import { Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = ({ onClick }) => {
    const buttonStyle = {
        position: 'fixed',
        bottom: '128px',
        right: '64px',
        zIndex: 1000,
    };

    return (
        <Fab
            color="primary"
            aria-label="search"
            onClick={onClick}
            style={buttonStyle}
        >
            <SearchIcon />
        </Fab>
    );
};

export default SearchButton;

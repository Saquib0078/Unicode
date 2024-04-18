import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBox({ onSearch }) {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false); // State to track loading state
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSearch = async () => {
        setLoading(true); // Set loading to true when search starts
        try {
            console.log("SearchBox Props:", { fromLocation, toLocation });
            await onSearch(fromLocation, toLocation);
        } catch (error) {
            console.error('Error performing search:', error.message);
        } finally {
            setLoading(false); // Set loading to false when search is done
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div style={{
                width: '25rem',
                height: '',
                padding: '25px',
                margin: '2rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
            }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <FormControl sx={{ m: 1, width: 'calc(80% - 8px)' }} variant="outlined">
                            <InputLabel htmlFor="from-location-input">From Location</InputLabel>
                            <OutlinedInput
                                id="from-location-input"
                                startAdornment={<InputAdornment position="start">From</InputAdornment>}
                                label="From Location"
                                onChange={(e) => setFromLocation(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 'calc(80% - 8px)' }} variant="outlined">
                            <InputLabel htmlFor="to-location-input">To Location</InputLabel>
                            <OutlinedInput
                                id="to-location-input"
                                startAdornment={<InputAdornment position="start">To</InputAdornment>}
                                label="To Location"
                                onChange={(e) => setToLocation(e.target.value)}
                            />
                        </FormControl>

                        <div style={{ margin: '20px' }}>
                            <h4>Select a Date:</h4>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                style={{
                                    padding: '0.7rem',
                                    fontSize: '1rem',
                                    border: '2px solid #ccc',
                                    borderRadius: '5px',
                                    outline: 'none',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',

                                }}
                            />
                        </div>
                        <FormControl sx={{ m: 1, width: 'calc(80% - 8px)' }} variant="outlined">
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? <CircularProgress size={24} /> : 'Search'} {/* Show loading indicator if loading */}
                            </Button>
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 'calc(80% - 8px)' }} variant="outlined">
                            <Button variant="outlined" color="error" onClick={handleLogout}>
                                Logout
                            </Button>
                        </FormControl>


                    </div>
                </Box>
            </div>
        </div>

    );
}

export default SearchBox;

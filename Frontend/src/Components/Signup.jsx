import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            navigate('/home');
        }else{
            navigate('/')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting the form
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signupUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, mobile }),
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            navigate(`/verify-otp?mobile=${mobile}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };

    return (
<div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        width: '400px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>            <Typography variant="h4">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mobile"
                    variant="outlined"
                    type="number"
                    
                    value={mobile}
                    onChange={(e) => {
                        const newValue = e.target.value.slice(0, 10);
                        setMobile(newValue);
                    }}  
                                      fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading} // Disable the button when loading
                >
                    {loading ? <CircularProgress size={24} /> : 'Register'} {/* Show loading indicator if loading */}
                </Button>
            </form>
            <div style={{
                display:'flex',
                justifyContent:'center',
                marginTop:'2rem'
            }}>
                <span>Already Have an Account ? <Link to="/login">Login</Link></span>
            </div>
        </div>
        </div>

    );
};

export default Signup;

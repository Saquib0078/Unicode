import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';

const VerifyOTP = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mobile = searchParams.get('mobile');
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const[error,setError]=useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/home');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({mobile, otp }),
        
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      navigate('/login');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh', 
      }}>
        <div style={{
          width: '400px',
          height: '200px', 
          padding: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          backgroundColor: '#fff', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        }}>
      <Typography variant="h4">Verify OTP</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 6);
            setOTP(newValue);
        }}          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Verify OTP
        </Button>
      </form>
    </div>
   </div>
  );
};

export default VerifyOTP;

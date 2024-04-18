import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOTP] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp,setShowOtp]=useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });
    
      const data = await response.json(); 
       setShowOtp(data.otp)
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      setIsOtpSent(true);
      setError('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      setError('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/verifyLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp }),
      });

      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

      const data = await response.json(); 
      const token = data.token; 
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      setError('Invalid OTP');
    }
  };

  const handleResendOTP = () => {
    setOTP('');
    setIsOtpSent(false);
    setError('');
    handleSendOTP();
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
      }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>Login</Typography>
        
        <Typography variant="body1" style={{ marginBottom: '20px', color:'green' }}>{`Your Otp is${showOtp}`}</Typography>

        <Typography variant="body1" style={{ marginBottom: '20px' }}>Enter your mobile number to receive OTP:</Typography>
        <TextField
          label="Mobile Number"
          variant="outlined"
          value={mobile}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 10);
            setMobile(newValue);
          }}
          fullWidth
          margin="normal"
        />
        {isOtpSent && (
          <TextField
            label="OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 6);
              setOTP(newValue);
            }}
            fullWidth
            margin="normal"
          />
        )}
        {error && (
          <Typography variant="body2" style={{ color: error === 'OTP sent successfully' ? 'green' : 'red', marginBottom: '20px' }}>{error}</Typography>
        )}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={isOtpSent ? handleVerifyOTP : handleSendOTP}
          disabled={isLoading || (isOtpSent && !otp)}
          style={{ marginBottom: '20px' }}
        >
          {isLoading ? <CircularProgress size={24} /> : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
        </Button>
        {isOtpSent && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleResendOTP}
            disabled={isLoading}
            style={{ marginBottom: '20px' }}
          >
            Resend OTP
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;

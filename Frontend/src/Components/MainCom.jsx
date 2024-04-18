import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import Destinations from './Destinations';
import { useNavigate } from 'react-router-dom';
const MainCom = () => {
    const navigate=useNavigate()
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        navigate('/home');
    }else{
        navigate('/')
    }
}, []);
  const handleSearch = async (from, to) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/hotels?from=${from}&to=${to}`);

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      setError('Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };


  const handleAll = async (from, to) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/hotels`);

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      setError('Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fromLocation && toLocation) {
      handleSearch();
    }else{
        handleAll()
    }
  }, [fromLocation, toLocation]);

 


  return (
    <div style={{display:'flex'}}>
      <SearchBox onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Destinations hotels={hotels} />

    </div>
  );
};

export default MainCom;

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Destinations = ({ hotels }) => {
  return (
    <div  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',marginTop:"0.7rem" }}>
    {hotels.map((hotel, index) => (
      <Card key={index} style={{ marginBottom: '16px' }}>
        <CardMedia
          component="img"
          height="200"
          image={hotel.image} 
          alt={hotel.name} 
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {hotel.name}
          </Typography>
          <Typography color="textSecondary">
            {hotel.city}
          </Typography>
          <Typography variant="body2" component="p">
            Rating: {hotel.rating}
          </Typography>
          <Typography variant="body2" component="p">
            Price: {hotel.price}
          </Typography>
          <Typography variant="body2" component="p">
            Address: {hotel.address}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </div>
  );
};

export default Destinations;

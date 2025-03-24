// src/pages/MapViewPage.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const MapViewPage = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://mapview-backend.onrender.com/map', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching map data', error);
      }
    };

    fetchMapData();
  }, []);

  if (!mapData) return <Typography>Loading map...</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Map View
      </Typography>
      <MapContainer
        center={[mapData.lat, mapData.lon]}
        zoom={mapData.zoom}
        style={{ height: '60vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData.locations.map((location) => (
          <Marker position={[location.lat, location.lon]} key={location.id}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default MapViewPage;

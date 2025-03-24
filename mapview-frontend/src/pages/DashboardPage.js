// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://mapview-backend.onrender.com/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {dashboardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;

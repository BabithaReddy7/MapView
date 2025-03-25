import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("https://mapview-backend.onrender.com/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ API Response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          setDashboardData(response.data.data);
        } else {
          console.warn("⚠️ No valid dashboard data received!", response.data);
          setError("No valid dashboard data received!");
        }
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        {dashboardData.length > 0 ? (
          dashboardData.map((card) => (
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
          ))
        ) : (
          <Typography>No dashboard data available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default DashboardPage;

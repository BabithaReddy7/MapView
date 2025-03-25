import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet styles are applied

const MapViewPage = () => {
  const [mapData, setMapData] = useState({ coordinates: [] });

  useEffect(() => {
    const fetchMapData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://mapview-backend.onrender.com/api/map",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.data) {
          setMapData(response.data.data); // Store only the "data" object
        } else {
          console.error("Invalid map data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Map View
      </Typography>

      <div
        style={{
          height: "60vh",
          width: "100%",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <MapContainer
          center={[
            mapData.coordinates[0]?.lat || 20,
            mapData.coordinates[0]?.lng || 77,
          ]} // Default to India if no data
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false} // Prevents unwanted scrolling
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {mapData.coordinates.length > 0 ? (
            mapData.coordinates.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  Location {index + 1}: {location.lat}, {location.lng}
                </Popup>
              </Marker>
            ))
          ) : (
            console.warn("No locations available for markers")
          )}
        </MapContainer>
      </div>
    </Container>
  );
};

export default MapViewPage;

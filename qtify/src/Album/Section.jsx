import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import { Button, Typography, Box } from "@mui/material";
import Carousel from "../Carousel/Carousel";

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]); // Initialize as an empty array
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Fetch data from API
    axios
      .get(apiEndpoint)
      .then((response) => {
        console.log(response);
        setAlbums(response.data || []); // Use empty array if response is not as expected
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load albums."); // Set error message
        setLoading(false); // Set loading to false in case of error
      });
  }, [apiEndpoint]);

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  console.log(albums);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="p" style={{ color: "#fff", fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography
          variant="contained"
          onClick={handleCollapseToggle}
          style={{ color: "#34c94b" }}
        >
          {collapsed ? "Show All" : "Collapse"}
        </Typography>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : collapsed ? (
        <Carousel>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Carousel>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Section;

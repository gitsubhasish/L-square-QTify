import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import Carousel from "../Carousel/Carousel";

const Section = ({ title, apiEndpoint, isSongSection = false }) => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenreKey, setSelectedGenreKey] = useState("all"); // Default to "all"
  const [collapsed, setCollapsed] = useState(true); // For albums section, to toggle between carousel and grid
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch albums or songs data
    const fetchData = async () => {
      try {
        const albumResponse = await axios.get(apiEndpoint);
        setAlbums(albumResponse.data || []);

        if (isSongSection) {
          // Fetch genres data if it's the song section
          const genresResponse = await axios.get(
            "https://qtify-backend-labs.crio.do/genres"
          );
          const fetchedGenres = genresResponse.data.data;

          setGenres([{ key: "all", label: "All" }, ...fetchedGenres]); // Add "All" to genres

          // Default to the "all" tab
          setSelectedGenreKey("all");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, isSongSection]);

  useEffect(() => {
    // Log state to debug
    console.log("Albums fetched:", albums);
    console.log("Genres fetched:", genres);
    console.log("Selected Genre Key:", selectedGenreKey);
  }, [albums, genres, selectedGenreKey]);

  const handleTabChange = (event, newValue) => {
    setSelectedGenreKey(newValue); // Update selected genre key based on tab change
    console.log("Selected Genre Key Changed:", newValue); // Debugging log
  };

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  // Apply genre filtering for the songs section
  const filteredAlbums = isSongSection
    ? selectedGenreKey === "all"
      ? albums // Show all albums if "All" is selected
      : albums.filter((album) => album.genre.key === selectedGenreKey) // Filter by selected genre
    : albums;

  // Log filtered albums for debugging
  useEffect(() => {
    console.log("Filtered Albums:", filteredAlbums);
  }, [filteredAlbums]);

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
        <Typography variant="h6" style={{ color: "#fff", fontWeight: 600 }}>
          {title}
        </Typography>
        {!isSongSection && (
          <Typography
            variant="contained"
            onClick={handleCollapseToggle}
            style={{ color: "#34c94b", cursor: "pointer" }}
          >
            {collapsed ? "Show All" : "Collapse"}
          </Typography>
        )}
      </Box>

      {isSongSection && genres.length > 0 && (
        <Tabs
          value={selectedGenreKey}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            marginBottom: 2,
            "& .MuiTabs-indicator": { backgroundColor: "#34c94b" },
            "& .MuiTab-root": {
              color: "#fff",
              "&.Mui-selected": { color: "#34c94b", fontWeight: 600 },
            },
          }}
        >
          {genres.map((genre) => (
            <Tab key={genre.key} label={genre.label} value={genre.key} />
          ))}
        </Tabs>
      )}

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {!isSongSection && collapsed ? (
            <Carousel>
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  displayLikes={isSongSection} // Display "Likes" for songs
                />
              ))}
            </Carousel>
          ) : isSongSection ? (
            <Carousel>
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  displayLikes={isSongSection} // Display "Likes" for songs
                />
              ))}
            </Carousel>
          ) : (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}
            >
              {filteredAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Section;

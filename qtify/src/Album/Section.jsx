import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import Carousel from "../Carousel/Carousel";

const Section = ({ title, apiEndpoint, isSongSection = false }) => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenreKey, setSelectedGenreKey] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await axios.get(apiEndpoint);
        setAlbums(albumResponse.data || []);

        if (isSongSection) {
          const genresResponse = await axios.get(
            "https://qtify-backend-labs.crio.do/genres"
          );
          const fetchedGenres = genresResponse.data.data;

          setGenres(fetchedGenres);

          if (Array.isArray(fetchedGenres) && fetchedGenres.length > 0) {
            setSelectedGenreKey(fetchedGenres[0].key);
          }
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
  console.log("Albums for filter : ", albums);
  const filteredAlbums = isSongSection
    ? albums.filter((album) => album.genre.key === selectedGenreKey)
    : albums;

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
                  displayLikes={isSongSection}
                />
              ))}
            </Carousel>
          ) : isSongSection ? (
            <Carousel>
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  displayLikes={isSongSection}
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

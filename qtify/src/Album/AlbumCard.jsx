import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const AlbumCard = ({ album, displayLikes }) => {
  return (
    <Card sx={{ width: 170 }}>
      <CardMedia
        component="img"
        height="170"
        image={album.image}
        alt={album.name}
      />
      <CardContent>
        <Chip
          size="small"
          style={{ backgroundColor: "#000", color: "#fff" }}
          label={
            displayLikes ? `${album.likes} Likes` : `${album.follows} Follows`
          }
        />
      </CardContent>
      <Typography gutterBottom variant="p" component="div">
        {album.title}
      </Typography>
    </Card>
  );
};

export default AlbumCard;

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { setIndex, toggleMusic } from "../redux/playlist/playlistSlice";
import {useDispatch} from "react-redux";

export default function MediaControlCard({ song, index }) {
  const [showAction, setShowAction] = useState(false);
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setIndex(index));
    setShowAction(prev => !prev);
  }

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={song?.imageURL}
        alt="image"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {song?.name}
          </Typography>
          <IconButton aria-label="play/pause"  onClick={handlePlay}>
           {
            showAction ? <PauseIcon  sx={{ height: 38, width: 38 }}/>:<PlayArrowIcon sx={{ height: 38, width: 38 }}/>
           } 
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {song?.artist}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import MusicList from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist } from "../redux/playlist/playlistSlice";
import { Player } from "../components/MusicPlayer";
import {
  reset,
  stepDown,
  stepUp,
  toggleMusic,
} from "../redux/playlist/playlistSlice";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state?.playlist);
  const currentIndex = useSelector((state) => state?.currentIndex);
  const loading = useSelector((state) => state?.loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setfilteredSongs] = useState([]);
  useEffect(() => {
    setfilteredSongs(playlist?.data?.filter((song) => song?.name?.toLowerCase()?.includes(searchQuery) || song?.artist?.toLowerCase()?.includes(searchQuery)));
  }, [searchQuery]);

  useEffect(() => {
    dispatch(fetchPlaylist());
  }, []);

  const playNext = () => {
    if (currentIndex > playlist?.length) {
      dispatch(reset());
    } else {
      dispatch(stepUp());
    }
  };

  const playPrevious = () => {
    if (currentIndex === 0) {
      dispatch(reset());
    } else {
      dispatch(stepDown());
    }
  };

  return (
    <>
      <AppBar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
      
      <Grid container spacing={2}>
  <Grid item xs={4}>
    <Item>      <MusicList songs={filteredSongs || playlist?.data} />
</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>  {playlist?.data?.length > 0 && (
        <Player
          songs={playlist?.data}
          currentIndex={currentIndex}
          playNext={playNext}
          playPrevious={playPrevious}
        />
      )}</Item>
  </Grid>
</Grid> 
    
    </>
  );
}

export default Home;

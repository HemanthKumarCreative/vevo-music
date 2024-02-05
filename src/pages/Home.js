import React, { useEffect } from "react";
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

function Home() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state?.playlist);
  const currentIndex = useSelector((state) => state?.currentIndex);
  const isSongPlaying = useSelector((state) => state?.isSongPlaying);

  useEffect(() => {
    dispatch(fetchPlaylist());
  }, []);

  const closePlayer = () => {
    if (isSongPlaying) {
      dispatch(toggleMusic());
    }
  };

  const playNext = () => {
    if (currentIndex > playlist?.length) {
      dispatch(reset());
    } else {
      dispatch(stepUp());
    }
  };

  const playPrevious = () => {
    if (currentIndex === 0) {
      reset();
    } else {
      stepDown();
    }
  };

  return (
    <>
      <AppBar />
      <MusicList songs={playlist?.data} />
      {playlist?.data?.length > 0 && (
        <Player
          songs={playlist?.data}
          currentIndex={currentIndex}
          playNext={playNext}
          playPrevious={playPrevious}
        />
      )}
    </>
  );
}

export default Home;

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const Player = ({ songs, currentIndex, playNext, playPrevious }) => (
  <AudioPlayer
    autoPlay={true}
    src={songs[currentIndex]?.songUrl}
    onPlay={(e) => console.log("onPlay")}
    showSkipControls={true}
    onClickNext={playNext}
    onClickPrevious={playPrevious}
  />
);

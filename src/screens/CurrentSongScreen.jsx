import React, { useEffect, useState } from "react";
import "./currentSongScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { currentIndex, setGradientColors } from "../redux/Reducers";
import {
  FaBackward,
  FaPlay,
  FaPause,
  FaForward,
  FaVolumeUp,
  FaVolumeOff,
  FaPauseCircle,
  FaPlayCircle,
  FaEllipsisH,
} from "react-icons/fa";
// import { Color } from "react-color-surge/dist/index";
import { colorDetection, toHex } from "@dominate-color-js/core";

const CurrentSongScreen = () => {
  const { selectedSong, gradientColors, currentSongIndex, songsLength } =
    useSelector((state) => state);
  // const [isMuted, setIsMuted] = useState(false);
  const dispatch = useDispatch();
  // console.log(currentSongIndex, songsLength);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Reset the audio player whenever the audioUrl prop changes
    if (selectedSong?.url) {
      colorDetection(selectedSong?.photo)
        .then(toHex)
        .then((res) => handleColorsExtracted(res))
        .catch((err) => console.log(err));
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      // setDuration(selectedSong?.duration);
      setIsPlaying(true);
      audioRef.current.play();
      audioRef.current.muted = false;
      setIsMuted(false);
    }
    // eslint-disable-next-line
  }, [selectedSong]);

  useEffect(() => {
    if (selectedSong?.url) {
      const audioElement = audioRef.current;

      const handleTimeUpdate = () => {
        if (audioElement.currentTime > 217) {
          handleNextSong();
        } else {
          setCurrentTime(audioElement.currentTime);
        }
      };

      const handleLoadedData = () => {
        // setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadeddata", handleLoadedData);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("loadeddata", handleLoadedData);
      };
    }
    // eslint-disable-next-line
  }, [selectedSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songsLength;
    dispatch(currentIndex(nextIndex));
    // setCurrentSongIndex(nextIndex);
  };

  const handlePreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songsLength) % songsLength;
    dispatch(currentIndex(prevIndex));
    // setCurrentSongIndex(prevIndex);
  };
  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  const handleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleColorsExtracted = (colors) => {
    console.log("colors", colors);
    dispatch(setGradientColors(colors));
  };

  if (!selectedSong) {
    return (
      <div id="current-song-screen-main-div">
        <h1>Select a song to play</h1>
        <div />
      </div>
    );
  } else {
    return (
      <>
        <div id="current-song-screen-main-div" className="display_none">
          <div id="current-song-screen-sub-div">
            <div id="display_none">
              <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>
                {selectedSong?.title}
              </h1>
              <h6
                style={{
                  color: "white",
                  fontSize: "15px",
                  marginTop: "10px",
                  marginBottom: "16px",
                  opacity: 0.4,
                }}
              >
                {selectedSong?.artist}
              </h6>
            </div>
            <img
              style={{
                width: "100%",
                height: "50vh",
                aspectRatio: 1,
                marginTop: "0px",
              }}
              alt="Song Cover"
              src={selectedSong?.photo}
            />
            {/* <ColorExtractor getColors={handleColorsExtracted}>
            </ColorExtractor> */}

            <audio ref={audioRef} src={selectedSong?.url} />

            <div className="audio-scrollbar-div">
              {/* <span>{formatTime(currentTime)}</span> */}
              <input
                style={{ flex: 1 }}
                type="range"
                value={currentTime}
                color="white"
                max={217}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
              />
              {/* <span>{formatTime(217)}</span> */}
            </div>

            <div className="audio-player-buttons-div">
              <button
                className="player-button display_none"
                id="options-button"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <FaEllipsisH />
              </button>
              <div className="audio-player-buttons">
                <button
                  onClick={handlePreviousSong}
                  className="player-button display_none"
                  id="previous-button"
                  style={{ backgroundColor: "transparent" }}
                >
                  <FaBackward className="icon-backward" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="player-button"
                  id="play-pause-button"
                  style={{ backgroundColor: "transparent" }}
                >
                  {!isPlaying ? (
                    <FaPlayCircle className="player-button " />
                  ) : (
                    <FaPauseCircle className="player-button " />
                  )}
                </button>
                <button
                  onClick={handleNextSong}
                  className="player-button display_none"
                  id="next-button"
                  style={{ backgroundColor: "transparent" }}
                >
                  <FaForward className="icon-backward" />
                </button>
              </div>
              <button
                onClick={handleMute}
                className="player-button display_none"
                id="mute-button"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                {isMuted ? (
                  <FaVolumeOff className="icon-vol" />
                ) : (
                  <FaVolumeUp className="icon-vol" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div
          className="displaymax"
          style={{
            background: `linear-gradient(to right, ${gradientColors.join(
              ", "
            )})`,
          }}
        >
          <div class="button_player">
            <div id="coverimage-songdetails-div">
              <div class="current-song-cover-container">
                <img
                  class="current-song-cover-image"
                  style={{ borderRadius: 50, width: "80px", height: "80px" }}
                  src={selectedSong?.photo}
                  alt="Song Cover"
                />
              </div>
              <div class="current-song-details-mobile">
                <p style={{ fontSize: "18px" }}>{selectedSong?.title}</p>
                <p style={{ fontSize: "13px", opacity: "0.5" }}>
                  {selectedSong?.artist}
                </p>
              </div>
            </div>

            <div class="player">
              <button
                onClick={handlePlayPause}
                class="player-button"
                id="play-pause-button"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              {/* <!-- Add your like button code here --> */}
            </div>
          </div>
          <div class="audio_player">
            <audio ref={audioRef} src={selectedSong?.url} />
            <div class="center">
              <input
                style={{ flex: 1 }}
                type="range"
                value={currentTime}
                color="white"
                max={217}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CurrentSongScreen;

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import GuessSkip from "../GuessSkip/GuessSkip";
import PauseIcon from "@mui/icons-material/Pause";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MicIcon from "@mui/icons-material/Mic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DrumsIcon from "../Icons/DrumsIcon";
import Success from "../Success/Success";

const MusicPlayer = ({
  layers,
  songsList,
  song,
  setSuccess,
  success,
  showError,
  setShowError,
  showPlayer,
  setShowPlayer
}) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeLayers, setActiveLayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (layers) {
      const initializedLayers = layers.map((layer, index) => ({
        ...layer,
        isActive: index === 0,
      }));
      setActiveLayers(initializedLayers);
    }
  }, [layers]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  }, [activeLayerIndex]);

  const onGuessSuccess = () => {
    setSuccess(true);
    setShowError(false);
    localStorage.setItem("success", "true");
  };

  const handleSkip = () => {
    setShowPlayer(false);
    moveToNextLayer();
  };

  const moveToNextLayer = () => {
    if (activeLayerIndex < activeLayers.length - 1) {
      const updatedLayers = activeLayers.map((layer, index) => {
        if (index === activeLayerIndex + 1) {
          return { ...layer, isActive: true };
        }
        return layer;
      });
      setActiveLayers(updatedLayers);
      setActiveLayerIndex(activeLayerIndex + 1);
    }
  };

  const handlePlayPause = () => {
    if (!isFirstPlay) {
      setIsFirstPlay(true);
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setShowPlayer(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const activeLayer = activeLayers[activeLayerIndex];
  const getIcon = (layerIndex) => {
    switch (layerIndex) {
      case 0:
        return <DrumsIcon sx={{ fontSize: 40 }} />;
      case 1:
        return <QueueMusicIcon sx={{ fontSize: 40 }} />;
      case 2:
        return <DrumsIcon sx={{ fontSize: 40 }} />;
      case 3:
        return <QueueMusicIcon sx={{ fontSize: 40 }} />;
      case 4:
        return <MicIcon sx={{ fontSize: 40 }} />;
      default:
        return <MusicNoteIcon sx={{ fontSize: 40 }} />;
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" textAlign="center" mb={2}>
            שכבות שיר נוכחיות
          </Typography>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            {activeLayers.map((layer, index) => (
              <Grid item xs={2.4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100px",
                    backgroundColor: layer.isActive ? "#e0f7fa" : "transparent",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                  }}
                >
                  {getIcon(index)}
                </Box>
              </Grid>
            ))}
          </Grid>
          {activeLayer && (
            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "center", mt: 2 }}
            >
              {activeLayer.title}
            </Typography>
          )}
          {success && <Success songTitle={song.title} songViews={song.views} />}
          {activeLayer && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <audio ref={audioRef} controls style={{ width: "100%" }}>
                <source src={activeLayer.file} type="audio/mpeg" />
                הדפדפן שלך אינו תומך באלמנט שמע.
              </audio>
            </Box>
          )}
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              disabled={success}
              color="success"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayCircleIcon fontSize="large" />
              )}
            </IconButton>
          </Box>
          {isFirstPlay && showPlayer && (
            <GuessSkip
              showError={showError}
              setShowError={setShowError}
              onGuessSuccess={onGuessSuccess}
              onSkip={handleSkip}
              songsList={songsList}
              song={song}
              setShowPlayer={setShowPlayer}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MusicPlayer;

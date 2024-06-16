import React, { useState, useEffect, useRef } from "react";
import {
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import GuessSkip from "../GuessSkip/GuessSkip";
import PauseIcon from "@mui/icons-material/Pause";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MicIcon from "@mui/icons-material/Mic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DrumsIcon from "../Icons/DrumsIcon";
import Result from "../Result/Result";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import BassIcon from "../Icons/BassIcon";
import PianoGuitarIcon from "../Icons/PianoGuitarIcon";
import { useTheme } from "@emotion/react";

const LayeredAudioPlayer = ({
  layers,
  songsList,
  song,
  setSuccess,
  success,
  setFailed,
  failed,
  showError,
  setShowError,
  showPlayer,
  setShowPlayer,
}) => {
  const theme = useTheme();
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeLayers, setActiveLayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const isShow = !success.state && !failed.state;
  const levelsCounter = useRef(0);

  useEffect(() => {
    if (layers) {
      const initializedLayers = layers.map((layer, index) => ({
        ...layer,
        isActive: index === 0,
      }));
      setActiveLayers(initializedLayers);
    }
  }, [layers]);

  const updateStatistics = (isSuccess) => {
    const stats = JSON.parse(localStorage.getItem('userStats')) || {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    if (isSuccess) {
      stats[activeLayerIndex + 1]++; // Adjust index to match keys 1-5
    } else {
      stats[6]++; // Failure
    }
    localStorage.setItem('userStats', JSON.stringify(stats));
  };

  const onGuessSuccess = () => {
    setSuccess(prev => ({ ...prev, state: true, index: activeLayerIndex }));
    setShowError(false);
    updateStatistics(true);
  };

  const handleSkip = () => {
    setShowPlayer(false);
    setIsPlaying(false); 
    levelsCounter.current++;
    setFailed(prev => ({ ...prev, state: levelsCounter.current === 5, index: activeLayerIndex }));
    updateStatistics(false);
    moveToNextLayer();
  };

  const getLayersColors = (index) => {
    if (success.state && index === success.index) {
      return { border: "#6A9D6A", background: "#DBEDDD" };
    }
    if (failed.state && index === failed.index) {
      return { border: "#974C50", background: "#F0D7DA" };
    }
    if (success.state || failed.state) {
      if (index < (success.state ? success.index : failed.index)) {
        return { border: "#FFD700", background: "#FBF6D7" };
      }
      return { border: "#FFFFFF", background: "#D3D3D3" };
    }
    if (index < activeLayerIndex) {
      return { border: "#FFD700", background: "#FBF6D7" };
    }
    if (index === activeLayerIndex) {
      return { border: "#ADD8E6", background: "#87CEEB" };
    }
    return { border: "#A9A9A9", background: "#D3D3D3" };
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
      localStorage.setItem('layerIndex', activeLayerIndex + 1);
    }
  };

  const handlePlayPause = () => {
    if (!isFirstPlay) {
      setIsFirstPlay(true);
    }
    setIsPlaying(prev => !prev);
    if (!isPlaying) {
      setShowPlayer(prev => true);
    }
  };

  const activeLayer = activeLayers[activeLayerIndex];
  const getIcon = (layerIndex) => {
    switch (layerIndex) {
      case 0:
        return <DrumsIcon sx={{ fontSize: 40 }} />;
      case 1:
        return <BassIcon sx={{ fontSize: 40 }} />;
      case 2:
        return <PianoGuitarIcon sx={{ fontSize: 40 }} />;
      case 3:
        return <QueueMusicIcon sx={{ fontSize: 40, padding: '2px' }} />;
      case 4:
        return <MicIcon sx={{ fontSize: 40, padding: '2px' }} />;
      default:
        return <MusicNoteIcon sx={{ fontSize: 40 }} />;
    }
  };
  return (
    <>
      <Box sx={{minHeight: '100%'}}>
        <CardContent>
          <Typography variant="h5" component="div" textAlign="center" mb={2}>
            שכבות שיר נוכחיות
          </Typography>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            {activeLayers.map((layer, index) => (
              <Grid item xs={2.4} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '76px' ,
                    borderRadius: 1,
                    backgroundColor: getLayersColors(index).background,
                    border: `3px solid ${getLayersColors(index).border}`,
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
          {success.state && <Result song={song} isSuccess={true} />}
          {activeLayer && isShow && (
            <AudioPlayer
              file={activeLayer.file}
              progress={progress}
              setProgress={setProgress}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          {failed.state && <Result song={song} isSuccess={false} />}
          {isShow && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton
                disabled={success.state}
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
          )}
          {isFirstPlay && showPlayer && (
            <GuessSkip
              show={isShow}
              showError={showError}
              setShowError={setShowError}
              onGuessSuccess={onGuessSuccess}
              onSkip={handleSkip}
              songsList={songsList}
              song={song}
            />
          )}
        </CardContent>
      </Box>
    </>
  );
};

export default LayeredAudioPlayer;

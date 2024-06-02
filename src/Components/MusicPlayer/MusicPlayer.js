// src/components/MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import GuessSkip from '../GuessSkip/GuessSkip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const MusicPlayer = ({ layers, songsList , song}) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeLayers, setActiveLayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (layers) {
      const initializedLayers = layers.map((layer, index) => ({
        ...layer,
        isActive: index === 0
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

  const handleGuess = (guess) => {
    console.log('Guess:', guess);
    moveToNextLayer();
  };

  const handleSkip = () => {
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
    if(!isFirstPlay){
      setIsFirstPlay(true);
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const activeLayer = activeLayers[activeLayerIndex];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          שכבות שיר נוכחיות
        </Typography>
        <List>
          {activeLayers.map((layer, index) => (
            <ListItem key={index} sx={{ backgroundColor: layer.isActive ? '#e0f7fa' : 'transparent' }}>
              <ListItemText primary={layer.title} />
            </ListItem>
          ))}
        </List>
        {activeLayer && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <audio ref={audioRef} controls style={{ width: '100%' }}>
              <source src={activeLayer.file} type="audio/mpeg" />
              הדפדפן שלך אינו תומך באלמנט שמע.
            </audio>
          </Box>
        )}
        <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton color="success" onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon fontSize='large' /> : <PlayArrowIcon fontSize='large'/>}
      </IconButton>
        </Box>
        {
        isFirstPlay &&
        <GuessSkip onGuess={handleGuess} onSkip={handleSkip} songsList={songsList} song={song}/>
        }
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;

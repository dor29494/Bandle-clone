// src/components/GuessSkip.js
import React, { useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const GuessSkip = ({ onGuess, onSkip, onPlayPause, isPlaying }) => {
  const [guess, setGuess] = useState('');

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    onGuess(guess);
    setGuess('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <TextField
        label="Recognize it? Type the artist name or title"
        variant="outlined"
        value={guess}
        onChange={handleGuessChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleGuessSubmit} sx={{ ml: 2 }}>
        Guess
      </Button>
      <Button variant="contained" color="secondary" onClick={onSkip} sx={{ ml: 2 }}>
        Skip
      </Button>
      <IconButton color="success" onClick={onPlayPause} sx={{ ml: 2 }}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Box>
  );
};

export default GuessSkip;

// src/components/GuessSkip.js
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    textAlign: 'right',
    right: '2rem', // Align to the right side of the container
    direction: 'rtl', // Ensuring RTL text direction
  },
  '& .MuiInputLabel-root.Mui-focused': { // When the label is focused
    right: '2rem'
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': { // When the label shrinks
    transformOrigin: 'top right',
    right: '2rem', // Maintain alignment when shrunk
  }
});

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
     
      <Button variant="contained" color="primary" onClick={handleGuessSubmit} sx={{ ml: 2 }}>
        Guess
      </Button>
      <StyledTextField
        label="מזהה את השיר?"
        textAlign="center"
        variant="outlined"
        value={guess}
        onChange={handleGuessChange}
        fullWidth
      />
      <Button variant="contained" color="secondary" onClick={onSkip} sx={{ mr: 2 }}>
        Skip
      </Button>
    
    </Box>
  );
};

export default GuessSkip;

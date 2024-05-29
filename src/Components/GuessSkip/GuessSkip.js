import React, { useState } from 'react';
import { Autocomplete, Box, Button, TextField, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAutoComplete = styled(TextField)({
  '& .MuiInputLabel-root': {
    textAlign: 'right',
    right: '2rem',
    direction: 'rtl',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    right: '2rem'
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    transformOrigin: 'top right',
    right: '2rem',
  }
});

const GuessSkip = ({ onGuess, onSkip, songs, song }) => {
  const [availableSongs, setAvailableSongs] = useState(songs);
  const [guess, setGuess] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSongChange = (event, newValue) => {
    setGuess(newValue);
  };

  const handleGuessSubmit = () => {
    if (guess === song) {
      onGuess(guess);
    } else {
      setShowError(true);
      setAvailableSongs(prevSongs => prevSongs.filter(s => s !== guess));
      setTimeout(() => {
        setShowError(false);
        onSkip();
      }, 3000); // Display the error for 3 seconds before skipping
    }
    setGuess('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      {showError && <Alert severity="error">Wrong guess! Moving to the next layer...</Alert>}
      <Button variant="contained" color="primary" onClick={handleGuessSubmit} sx={{ ml: 2 }}>
        Guess
      </Button>
      <Autocomplete
        disablePortal
        fullWidth
        id="songsAutocomplete"
        options={availableSongs}
        renderInput={(params) => <TextField {...params} label="Choose a song" fullWidth />}
        onChange={handleSongChange}
      />
      <Button variant="contained" color="secondary" onClick={onSkip} sx={{ mr: 2 }}>
        Skip
      </Button>
    </Box>
  );
};

export default GuessSkip;

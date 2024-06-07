import React, { useState } from "react";
import { Autocomplete, Box, Button, TextField, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    textAlign: "right",
    right: "2rem",
    direction: "rtl",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    right: "2rem",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    transformOrigin: "top right",
    right: "2rem",
  },
});

const GuessSkip = ({ onGuessSuccess, onSkip, songsList, song }) => {
  const [availableSongs, setAvailableSongs] = useState(
    songsList.map((x) => x.title)
  );
  const [guess, setGuess] = useState({ id: null, title: null });
  const [showError, setShowError] = useState(false);

  const handleSongChange = (event, newValue) => {
    const guessObject = songsList.filter((x) => x.title === newValue)[0];
    setGuess(guessObject);
  };

  const handleGuessSubmit = () => {
    if (Number(guess.id) === Number(song.id)) {
      onGuessSuccess();
    } else {
      setShowError(true);
      setGuess({id: null, title: null});
      setAvailableSongs((prevSongs) => prevSongs.filter((s) => s !== guess));
      onSkip();
    }
  };
 

  return (
    <>
      {showError && (
        <ErrorPopup message={"test"} onClose={() => setShowError(false)} />
      )}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuessSubmit}
          sx={{ ml: 2 }}
        >
          Guess
        </Button>
        <Autocomplete
          disablePortal
          fullWidth
          id="songsAutocomplete"
          options={availableSongs}
          renderInput={(params) => (
            <StyledTextField {...params} label="בחר שיר" fullWidth />
          )}
          onChange={handleSongChange}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={onSkip}
          sx={{ mr: 2 }}
        >
          Skip
        </Button>
      </Box>
    </>
  );
};

export default GuessSkip;

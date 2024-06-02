import React, { useState } from "react";
import { Autocomplete, Box, Button, TextField, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const GuessSkip = ({ onGuess, onSkip, songsList, song }) => {
  console.log(songsList);
  const [availableSongs, setAvailableSongs] = useState(songsList.map(x => x.title));
  const [guess, setGuess] = useState({id: null, title: null});
  const [showError, setShowError] = useState(false);

  const handleSongChange = (event, newValue) => {
    setGuess(newValue);
  };

  const handleGuessSubmit = () => {
    console.log(guess,song);
    // if (guess === song) {
    //   onGuess(guess);
    // } else {
    //   setShowError(true);
    //   setAvailableSongs((prevSongs) => prevSongs.filter((s) => s !== guess));
    //   setTimeout(() => {
    //     setShowError(false);
    //     onSkip();
    //   }, 3000); // Display the error for 3 seconds before skipping
    // }
    // setGuess("");
  };

  return (
    <>
      {showError && (
        <Alert severity="error">שיר לא נכון!</Alert>
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

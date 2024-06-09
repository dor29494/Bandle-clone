// src/components/GuessSkip.js
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";

const GuessSkip = ({
  setShowError,
  onGuessSuccess,
  onSkip,
  songsList,
  song,
  show,
}) => {
  const [availableSongs, setAvailableSongs] = useState(
    songsList.map((x) => x.title)
  );
  const [guess, setGuess] = useState({ id: null, title: null });

  const handleSongChange = (event, newValue) => {
    const guessObject = songsList.filter((x) => x.title === newValue)[0];
    setGuess(guessObject);
  };

  const handleGuessSubmit = () => {
    if (guess.id === null || guess.title === null) {
      return;
    }
    if (Number(guess.id) === Number(song.id)) {
      onGuessSuccess();
    } else {
      setShowError(true);
      setGuess({ id: null, title: null });
      setAvailableSongs((prevSongs) => prevSongs.filter((s) => s !== guess));
      onSkip();
    }
  };
  return (
    <>
      {show && (
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuessSubmit}
            sx={{ ml: 2 }}
          >
            נחש
          </Button>
          <SongAutocomplete
            availableSongs={availableSongs}
            handleSongChange={handleSongChange}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={onSkip}
            sx={{ mr: 2 }}
          >
            דלג
          </Button>
        </Box>
        )}
    </>
  );
};

export default GuessSkip;

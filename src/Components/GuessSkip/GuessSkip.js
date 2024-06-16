import React, { useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";

const GuessSkip = ({
  setShowError,
  onGuessSuccess,
  onSkip,
  songsList,
  song,
  show,
  isMobile
}) => {
  const [availableSongs, setAvailableSongs] = useState(
    songsList.map((x) => x.title)
  );
  const [guess, setGuess] = useState({ id: null, title: null });

  const handleGuessSubmit = () => {
    if (guess.id === null || guess.title === null) {
      return;
    }
    if (Number(guess.id) === Number(song.id)) {
      onGuessSuccess();
    } else {
      setShowError(true);
      setGuess({ id: null, title: null });
      setAvailableSongs((prevSongs) => prevSongs.filter((s) => s !== guess.title));
      onSkip();
    }
  };

  const handleSongChange = useCallback(
    (newValue) => {
      const guessObject = songsList.find((x) => x.title === newValue) || { id: null, title: null };
      setGuess(guessObject);
    },
    [songsList]
  );

  return (
    <>
      {show && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column" ,
            alignItems: "center",
            mt: 2,
            width: "100%",
          }}
        >
          <SongAutocomplete
            availableSongs={availableSongs}
            handleSongChange={handleSongChange}
            sx={{ width: isMobile ? "100%" : "80%", mb: isMobile ? 2 : 0 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" , gap: isMobile ? '45%' : '0', mt: 3}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuessSubmit}
              sx={{ ml: isMobile ? 0 : 2, flexGrow: isMobile ? 1 : 0}}
            >
              נחש
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSkip}
              sx={{ mr: isMobile ? 0 : 2, flexGrow: isMobile ? 1 : 0 }}
            >
              דלג
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GuessSkip;

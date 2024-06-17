import React, { useState, useCallback } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";

const GuessSkip = ({
  setShowError,
  onGuessSuccess,
  onSkip,
  songsList,
  song,
  show,
  activeLayer, // Add activeLayer as a prop
}) => {
  const [availableSongs, setAvailableSongs] = useState(
    songsList.map((x) => x.title)
  );
  const [guess, setGuess] = useState({ id: null, title: null });
  console.log(activeLayer)
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
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            width: "100%",
          }}
        >
          <SongAutocomplete
            availableSongs={availableSongs}
            handleSongChange={handleSongChange}
            sx={{ width: "100%", mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: '55%', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuessSubmit}
              sx={{ ml: 0, flexGrow: 1 }}
            >
              נחש
            </Button>
            <Tooltip
              title="אם לא הצלחת לנחש יש ללחוץ על דלג על מנת לגלות את השיר"
              open={activeLayer === 4} // Show tooltip only when activeLayer is 5
              arrow
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onSkip}
                sx={{ mr: 0, flexGrow: 1 }}
              >
                דלג
              </Button>
            </Tooltip>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GuessSkip;

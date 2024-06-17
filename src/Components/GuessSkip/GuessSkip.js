// src/Components/GuessSkip/GuessSkip.js
import React, { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, Button, Tooltip } from "@mui/material";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";
import {
  songState,
  availableSongsState,
  guessState,
  showErrorState,
  songsListState
} from '../../state';

const GuessSkip = ({
  onGuessSuccess,
  onSkip,
  show,
  activeLayer
}) => {
  const [availableSongs, setAvailableSongs] = useRecoilState(availableSongsState);
  const [songsList] = useRecoilState(songsListState);
  const [guess, setGuess] = useRecoilState(guessState);
  const [song] = useRecoilState(songState);
  const setShowError = useSetRecoilState(showErrorState);
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

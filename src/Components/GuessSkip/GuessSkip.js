import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, Tooltip } from "@mui/material";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import {
  availableSongsState,
  guessState,
  showErrorState,
  songState,
  songsListState
} from '../../state';

const GuessSkip = ({
  onGuessSuccess,
  onSkip,
  show,
  activeLayer,
}) => {
  const [availableSongs, setAvailableSongs] = useRecoilState(availableSongsState);
  const songsList = useRecoilValue(songsListState);
  const [guess, setGuess] = useRecoilState(guessState);
  const song = useRecoilValue(songState);
  const setShowError = useRecoilState(showErrorState)[1];
  const [alertOpen, setAlertOpen] = useState(false);

  const handleGuessSubmit = () => {
    if (guess.id === null || guess.title === null) {
      setAlertOpen(true);
      return;
    }
    if (guess.id === song.id) {
      onGuessSuccess();
    } else {
      setShowError(true);
      setGuess({ id: null, title: null });

      // Remove the wrong guess from available songs
      setAvailableSongs((prevSongs) =>
        prevSongs.filter((song) => song !== guess.title)
      );

      onSkip();
    }
  };

  const handleSongChange = useCallback(
    (newValue) => {
      const guessObject = songsList.find((x) => x.title === newValue) || { id: null, title: null };
      setGuess(guessObject);
    },
    [songsList, setGuess]
  );

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

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
              open={activeLayer === 4}
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
      <CustomSnackbar
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        message="אנא בחר ערך מהרשימה"
      />
    </>
  );
};

export default GuessSkip;

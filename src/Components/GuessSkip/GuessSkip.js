import { Box, Button, Tooltip } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  availableSongsState,
  guessState,
  showErrorState,
  songState,
  songsListState,
} from "../../state";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import SongAutocomplete from "../SongAutoComplete/SongAutoComplete";

const GuessSkip = ({
  onGuessSuccess,
  onSkip,
  show,
  activeLayer,
  availableSongs,
  setAvailableSongs,
  song,
  songsList,
}) => {
  const [guess, setGuess] = useRecoilState(guessState);
  const setShowError = useRecoilState(showErrorState)[1];
  const [alertOpen, setAlertOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

    setInputValue("");
  };

  const handleSongChange = useCallback(
    (newValue) => {
      const guessObject = songsList.find((x) => x.title === newValue) || {
        id: null,
        title: null,
      };
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
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "50px",
              mt: 3,
            }}
          >
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGuessSubmit}
                sx={{
                  ml: 0,
                  flexGrow: 1,
                  display: "inline-flex",
                  padding: "5px 0",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "60px 0 0 60px",
                  borderBottom: "2px solid #0096A0",
                  borderLeft: "2px solid #0096A0",
                  backgroundColor: "#11C8CA",
                  marginRight: "-16px",
                  width: "150px",
                  height: "41px",
                }}
              >
                <Box
                  color="#fff"
                  textAlign={"right"}
                  fontSize={"18px"}
                  fontWeight={"bold"}
                >
                  נחש
                </Box>
                <Box display={"inline-flex"}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.193 1.81669C11.743 0.436758 9.79085 0.436753 9.34085 1.81668L7.68751 6.88665C7.56375 7.26617 7.26617 7.56375 6.88665 7.68751L1.81669 9.34085C0.436758 9.79085 0.436753 11.743 1.81669 12.193L6.88761 13.8467C7.26668 13.9703 7.56404 14.2673 7.68806 14.6463L9.34134 19.6978C9.79231 21.0757 11.7416 21.0757 12.1925 19.6978L13.8461 14.6453C13.97 14.2668 14.2668 13.97 14.6453 13.8461L19.6978 12.1925C21.0757 11.7416 21.0757 9.79231 19.6978 9.34134L14.6463 7.68806C14.2673 7.56404 13.9703 7.26668 13.8467 6.88761L12.193 1.81669Z"
                      fill="white"
                    />
                    <path
                      d="M20.2248 16.2535C20.0273 15.5104 18.9727 15.5104 18.7751 16.2535L18.4318 17.5449C18.3167 17.9782 17.9782 18.3166 17.5449 18.4318L16.2536 18.7751C15.5105 18.9726 15.5105 20.0272 16.2536 20.2247L17.5449 20.568C17.9782 20.6832 18.3167 21.0216 18.4318 21.4549L18.7751 22.7463C18.9727 23.4894 20.0273 23.4894 20.2248 22.7463L20.5681 21.4549C20.6832 21.0216 21.0217 20.6832 21.455 20.568L22.7464 20.2247C23.4895 20.0272 23.4894 18.9726 22.7463 18.7751L21.455 18.4318C21.0217 18.3166 20.6832 17.9782 20.5681 17.5449L20.2248 16.2535Z"
                      fill="white"
                    />
                  </svg>
                </Box>
              </Button>
            </Box>
            {activeLayer === 4 && (
              <Box>
                <Tooltip
                  title="אם לא הצלחת לנחש יש ללחוץ כאן"
                  open={activeLayer === 4}
                  arrow
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onSkip}
                    sx={{
                      mr: 0,
                      flexGrow: 1,
                      display: "inline-flex",
                      padding: "5px 0",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "0 60px 60px 0",
                      borderBottom: "2px solid #FA276E",
                      borderRight: "2px solid #FA276E",
                      backgroundColor: "#FB4F78",
                      marginLeft: "-16px",
                      width: "150px",
                      height: "41px",
                    }}
                  >
                    <Box
                      color="#fff"
                      textAlign={"right"}
                      fontSize={"18px"}
                      fontWeight={"bold"}
                    >
                      {activeLayer === 4 ? "גלה את השיר" : "הוסף שכבה"}
                    </Box>
                    <Box display={"inline-flex"}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 20.5C10.75 21.1904 11.3096 21.75 12 21.75C12.6904 21.75 13.25 21.1904 13.25 20.5V13.25H20.5C21.1904 13.25 21.75 12.6904 21.75 12C21.75 11.3096 21.1904 10.75 20.5 10.75H13.25V3.5C13.25 2.80964 12.6904 2.25 12 2.25C11.3096 2.25 10.75 2.80964 10.75 3.5V10.75H3.5C2.80964 10.75 2.25 11.3096 2.25 12C2.25 12.6904 2.80964 13.25 3.5 13.25H10.75V20.5Z"
                          fill="#fff"
                        />
                      </svg>
                    </Box>
                  </Button>
                </Tooltip>
              </Box>
            )}
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

import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
import {
  songDataState,
  songState,
  tooltipMessageState,
  successState,
  failedState,
  showErrorState,
  showPlayerState,
  layersState,
  songsListState,
} from './state';
import LayeredAudioPlayer from './Components/LayeredAudioPlayer/LayeredAudioPlayer';
import SongDetails from './Components/SongDetails/SongDetails';
import Header from './Components/Header/Header';
import ErrorPopup from './Components/ErrorPopup/ErrorPopup';

// פונקציה שמקבלת תאריך התחלתי ומחזירה את האינדקס על סמך התאריך הנוכחי
function getIndexFromStartDate(startDate) {
    const start = new Date(startDate);
    const now = new Date();
    const timeDifference = now - start;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
}

const App = ({ setDarkMode, darkMode }) => {
  const [songData, setSongData] = useRecoilState(songDataState);
  const [song, setSong] = useRecoilState(songState);
  const [success, setSuccess] = useRecoilState(successState);
  const [failed, setFailed] = useRecoilState(failedState);
  const [showError, setShowError] = useRecoilState(showErrorState);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerState);
  const [layers, setLayers] = useRecoilState(layersState);
  const [songsList, setSongsList] = useRecoilState(songsListState);

  const difficultyEnum = { 1: "קל", 2: "בינוני", 3: "קשה" };

  useEffect(() => {
    // קבלת תאריך התחלתי מהסביבה
    const startDate = process.env.REACT_APP_START_DATE;

    fetch("/dummyData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // חישוב האינדקס על פי התאריך ההתחלתי
        const index = getIndexFromStartDate(startDate);
        const selectedSong = data[index % data.length]; // לוודא שהאינדקס בתוך תחום המערך

        selectedSong.difficulty = difficultyEnum[selectedSong.difficulty];
        setSong({ id: selectedSong.songId, title: selectedSong.songTitle, views: selectedSong.views, spotifyId: selectedSong.media.spotifyId, youtubeId: selectedSong.media.youtubeId });
        setSongData(selectedSong);
        setLayers(selectedSong.layers);
        setSongsList(selectedSong.songsList);
        successTest();
      })
      .catch((error) => console.error("Error fetching the JSON:", error));
  }, [setSong, setSongData, setLayers, setSongsList]);

  const successTest = () => {
    const resultTime = localStorage.getItem("lastResultTime");
    const isSuccess = localStorage.getItem("lastResult") === "true";
    const lastLayerIndex = localStorage.getItem("layerIndex") != null ? Number(localStorage.getItem("layerIndex")): 0;
    const resultDate = new Date(resultTime);
    const now = new Date();
    const compareDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    );
    if (resultDate && isSuccess) {
      if (resultDate.getTime() === compareDate.getTime() && isSuccess) {
        setSuccess(prev => ({...prev, state: true, index: lastLayerIndex}));
        setFailed(prev => ({...prev, state: false, index: lastLayerIndex}));
      }
    } else {
      const isFailed = localStorage.getItem("lastResult") === "false";
      if (resultDate.getTime() === compareDate.getTime() && isFailed) {
        setSuccess(prev => ({...prev, state: false, index: lastLayerIndex}));
        setFailed(prev => ({...prev, state: true, index: lastLayerIndex}));
      } else {
        setFailed(prev => ({...prev, state: false, index: lastLayerIndex}));
        setSuccess(prev => ({...prev, state: false, index: lastLayerIndex}));
      }
    }
  };

  if (!songData) return <CircularProgress/>;

  return (
    <>
      <Box maxWidth="480px" margin="auto" minHeight='100%'>
        <Header setDarkMode={setDarkMode} darkMode={darkMode}  />
        <Box sx={{ marginTop: "20px" }}>
          <Box>
            <SongDetails
              releaseDate={songData.releaseDate}
              views={songData.views}
              difficulty={songData.difficulty}
            />
          </Box>
          <Box mt={4}>
            <LayeredAudioPlayer />
          </Box>
        </Box>
      </Box>
      {showError && (
        <ErrorPopup
          message={"ניחוש שגוי"}
          onClose={() => setShowError(false)}
          setShowPlayer={setShowPlayer}
        />
      )}
    </>
  );
};

export default App;

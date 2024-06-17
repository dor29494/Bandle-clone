// src/App.js
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
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
    fetch("/dummyData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.difficulty = difficultyEnum[data.difficulty];
        setSong({ id: data.songId, title: data.songTitle, views: data.views, spotifyId: data.media.spotifyId, youtubeId: data.media.youtubeId });
        setSongData(data);
        setLayers(data.layers);
        setSongsList(data.songsList);
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

  if (!songData) return <div>Loading...</div>;

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

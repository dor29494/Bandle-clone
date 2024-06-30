import React, { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  songDataState,
  songState,
  successState,
  failedState,
  showErrorState,
  showPlayerState,
  layersState,
  songsListState,
  timerExpiredState,
  loaderState
} from './state';
import LayeredAudioPlayer from './Components/LayeredAudioPlayer/LayeredAudioPlayer';
import SongDetails from './Components/SongDetails/SongDetails';
import Header from './Components/Header/Header';
import ErrorPopup from './Components/ErrorPopup/ErrorPopup';
import Loader from './Components/Loader/Loader';
import shirdle_songs from './shirdle_songs.json';

function getIndexFromStartDate(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

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
  const timerExpired = useRecoilValue(timerExpiredState);
  const resetTimerExpired = useResetRecoilState(timerExpiredState);
  const [loading, setLoading] = useRecoilState(loaderState);
  const difficultyEnum = { 1: "קל", 2: "בינוני", 3: "קשה" };

  const fetchLayerData = async (selectedSongId) => {
    // const baseUrl = `${process.env.REACT_APP_LAYERS_URL}${selectedSongId}`;
    const baseUrl = '/assets/mp3';
    const layerTitles = [
      "תופים",
      "תופים + בס",
      "תופים + בס + ליווי מוזיקלי",
      "תופים + בס + ליווי מוזיקלי + מלודיות נוספות",
      "תופים + בס + ליווי מוזיקלי + מלודיות נוספות + שירה"
    ];
    // const fileNames = ["drums.mp3", "bass.mp3", "instrumental.mp3", "other.mp3", "vocals.mp3"];
    const fileNames = ["drums.wav", "bass.wav", "instrumental.wav", "other.wav", "vocals.wav"];

    const layerData = await Promise.all(
      fileNames.map(async (fileName, index) => {
        const url = `${baseUrl}/${fileName}`;
        try {
          const response = await fetch(url, { method: 'HEAD' });
          if (response.ok) {
            return {
              title: layerTitles[index],
              file: url,
              isActive: false
            };
          } else {
            console.error(`Error fetching ${fileName}: ${response.statusText}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching ${fileName}:`, error);
          return null;
        }
      })
    );

    return layerData.filter(layer => layer !== null);
  };

  const fetchSongData = useCallback(async () => {
    const startDate = process.env.REACT_APP_START_DATE;
    const index = getIndexFromStartDate(startDate);
    const selectedSong = shirdle_songs[index % shirdle_songs.length];
    selectedSong.difficulty = difficultyEnum[selectedSong.difficulty];
    setSong({ 
      id: selectedSong.songId,
      title: selectedSong.songTitle,
      views: selectedSong.views,
      spotifyId: selectedSong.media.spotifyId,
      youtubeId: selectedSong.media.youtubeId
    });

    setSongData(selectedSong);

    // Fetch layers and set them
    const layers = await fetchLayerData(selectedSong.songId);
    setLayers(layers);

    setSongsList(createAutoCompleteList(shirdle_songs));
    successTest();
  }, [setSong, setSongData, setLayers, setSongsList]);

  const createAutoCompleteList = (songs) => {
    return songs.map(song => ({
      id: song.songId,
      title: song.songTitle
    }));
  };

  const successTest = () => {
    const resultTime = localStorage.getItem("lastResultTime");
    const isSuccess = localStorage.getItem("lastResult") === "true";
    const lastLayerIndex = localStorage.getItem("layerIndex") != null ? Number(localStorage.getItem("layerIndex")) : 0;
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
        setSuccess(prev => ({ ...prev, state: true, index: lastLayerIndex }));
        setFailed(prev => ({ ...prev, state: false, index: lastLayerIndex }));
      }
    } else {
      const isFailed = localStorage.getItem("lastResult") === "false";
      if (resultDate.getTime() === compareDate.getTime() && isFailed) {
        setSuccess(prev => ({ ...prev, state: false, index: lastLayerIndex }));
        setFailed(prev => ({ ...prev, state: true, index: lastLayerIndex }));
      } else {
        setFailed(prev => ({ ...prev, state: false, index: lastLayerIndex }));
        setSuccess(prev => ({ ...prev, state: false, index: lastLayerIndex }));
      }
    }
  };

  useEffect(() => {
    fetchSongData();
  }, [fetchSongData]);

  useEffect(() => {
    if (timerExpired) {
      setLoading(true);
      console.log('Timer expired, fetching new song data');
      setSuccess({ index: 0, state: false });
      setFailed({ index: 0, state: false });
      localStorage.removeItem("layerIndex");
      localStorage.removeItem("lastResult");
      fetchSongData();
      resetTimerExpired();
      setLoading(false);
    }
  }, [timerExpired, fetchSongData, setSuccess, setFailed, resetTimerExpired]);

  if (!songData || loading) return (
    <Loader setDarkMode={setDarkMode} darkMode={darkMode}/>
  );

  return (
    <>
      <Box maxWidth="480px" margin="auto" minHeight='100%'>
        <Header setDarkMode={setDarkMode} darkMode={darkMode} />
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

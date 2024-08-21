import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import shirdle_songs from "../../shirdle_songs.json";
import {
  layersState,
  loaderState,
  showErrorState,
  songDataState,
  songsListState,
  timerExpiredState,
} from "../../state";
import top120songs from "../../top120songs.json";
import CloseHeader from "../CloseHeader/CloseHeader";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import LayeredAudioPlayer from "../LayeredAudioPlayer/LayeredAudioPlayer";
import Loader from "../Loader/Loader";
import SongDetails from "../SongDetails/SongDetails";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function getIndexFromStartDate(startDate, queryIndex) {
  if (queryIndex !== null && queryIndex >= 0 && queryIndex <= 400) {
    return queryIndex;
  }
  const start = new Date(startDate);
  const now = new Date();

  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const timeDifference = now - start;
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return dayDifference;
}

const difficultyEnum = { 1: "קל", 2: "בינוני", 3: "קשה" };

const filteredSongs = shirdle_songs.filter(
  (song) => top120songs.indexOf(song.songId) > -1
);

const DailyGame = ({ setDarkMode, darkMode }) => {
  const { width, height } = useWindowSize();
  const [songData, setSongData] = useRecoilState(songDataState);
  const [song, setSong] = useState({
    id: null,
    title: null,
    views: null,
    spotifyId: null,
    youtubeId: null,
  });
  const [success, setSuccess] = useState({ index: 0, state: false });
  const [failed, setFailed] = useState({ index: 0, state: false });
  const [showError, setShowError] = useRecoilState(showErrorState);
  const [layers, setLayers] = useRecoilState(layersState);
  const [songsList, setSongsList] = useRecoilState(songsListState);
  const timerExpired = useRecoilValue(timerExpiredState);
  const resetTimerExpired = useResetRecoilState(timerExpiredState);
  const [loading, setLoading] = useRecoilState(loaderState);
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchLayerData = (selectedSongId) => {
    const baseUrl = `${process.env.REACT_APP_LAYERS_URL}${selectedSongId}`;
    const layerTitles = [
      "תופים",
      "תופים + בס",
      "תופים + בס + ליווי מוזיקלי",
      "תופים + בס + ליווי מוזיקלי + מלודיות נוספות",
      "תופים + בס + ליווי מוזיקלי + מלודיות נוספות + שירה",
    ];
    const fileNames = [
      "drums.mp3",
      "bass.mp3",
      "instrumental.mp3",
      "other.mp3",
      "vocals.mp3",
    ];

    const layerData = fileNames.map((fileName, index) => ({
      title: layerTitles[index],
      file: `${baseUrl}/${fileName}`,
      isActive: false,
    }));

    return layerData;
  };

  const fetchSongData = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryIndex = urlParams.has("index")
      ? parseInt(urlParams.get("index"))
      : null;
    const startDate = process.env.REACT_APP_START_DATE;
    const index = getIndexFromStartDate(startDate, queryIndex);
    let selectedSong = filteredSongs[index % filteredSongs.length];
    // selectedSong.difficulty = difficultyEnum[selectedSong.difficulty];
    setSong({
      id: selectedSong.songId,
      title: selectedSong.songTitle,
      views: selectedSong.views,
      spotifyId: selectedSong.media.spotifyId,
      youtubeId: selectedSong.media.youtubeId,
    });

    setSongData({
      ...selectedSong,
      difficulty: difficultyEnum[selectedSong.difficulty],
    });

    const layers = await fetchLayerData(selectedSong.songId);
    setLayers(layers);

    setSongsList(createAutoCompleteList(shirdle_songs));
    successTest();
  }, [setSong, setSongData, setLayers, setSongsList]);

  const createAutoCompleteList = (songs) => {
    return songs.map((song) => ({
      id: song.songId,
      title: song.songTitle,
    }));
  };

  const successTest = () => {
    const resultTime = localStorage.getItem("lastResultTime");
    const isSuccess = localStorage.getItem("lastResult") === "true";
    const lastLayerIndex =
      localStorage.getItem("layerIndex") != null
        ? Number(localStorage.getItem("layerIndex"))
        : 0;
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
        setSuccess((prev) => ({ ...prev, state: true, index: lastLayerIndex }));
        setFailed((prev) => ({ ...prev, state: false, index: lastLayerIndex }));
      }
    } else {
      const isFailed = localStorage.getItem("lastResult") === "false";
      if (resultDate.getTime() === compareDate.getTime() && isFailed) {
        setSuccess((prev) => ({
          ...prev,
          state: false,
          index: lastLayerIndex,
        }));
        setFailed((prev) => ({ ...prev, state: true, index: lastLayerIndex }));
      } else {
        setFailed((prev) => ({ ...prev, state: false, index: lastLayerIndex }));
        setSuccess((prev) => ({
          ...prev,
          state: false,
          index: lastLayerIndex,
        }));
      }
    }
  };

  useEffect(() => {
    fetchSongData();
  }, [fetchSongData]);

  useEffect(() => {
    if (timerExpired) {
      setLoading(true);
      console.log("Timer expired, fetching new song data");
      setSuccess({ index: 0, state: false });
      setFailed({ index: 0, state: false });
      localStorage.removeItem("layerIndex");
      localStorage.removeItem("lastResult");
      localStorage.removeItem("lastResultTime");

      // bug fix because when its in the same second something wrong is happening!
      setTimeout(() => {
        fetchSongData();
        resetTimerExpired();
        setLoading(false);
      }, 250);
    }
  }, [timerExpired, fetchSongData, setSuccess, setFailed, resetTimerExpired]);

  const backClick = () => {
    navigate("/");
  };

  const onFinish = (_, isSuccess) => {
    if (isSuccess) setShowConfetti(true);
  };

  if (!songData || loading)
    return <Loader setDarkMode={setDarkMode} darkMode={darkMode} />;

  return (
    <>
      <Box sx={{ marginTop: "20px" }}>
        {showConfetti && (
          <Confetti
            width={Math.min(width - 20, 480)} // Limits the width to 480px on desktop
            height={height}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "auto",
              left: "auto",
            }}
          />
        )}
        <CloseHeader handleClick={backClick} />

        <Box>
          <SongDetails
            releaseDate={songData.releaseDate}
            views={songData.views}
            difficulty={songData.difficulty}
          />
        </Box>
        <Box mt={4}>
          <LayeredAudioPlayer
            darkMode={darkMode}
            layers={layers}
            songsList={songsList}
            success={success}
            setSuccess={setSuccess}
            failed={failed}
            setFailed={setFailed}
            song={song}
            onFinish={onFinish}
            isDaily={true}
          />
        </Box>
      </Box>
      {showError && (
        <CustomSnackbar
          alertOpen={true}
          handleCloseAlert={() => setShowError(false)}
          message={"ניחוש שגוי, נסו שנית"}
        />
      )}
    </>
  );
};

export default DailyGame;

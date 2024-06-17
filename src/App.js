// src/App.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LayeredAudioPlayer from "./Components/LayeredAudioPlayer/LayeredAudioPlayer";
import SongDetails from "./Components/SongDetails/SongDetails";
import Header from "./Components/Header/Header";
import ErrorPopup from "./Components/ErrorPopup/ErrorPopup";

const App = ({ setDarkMode, darkMode }) => {
  const [songData, setSongData] = useState(null);
  const [song, setSong] = useState({ id: null, title: null, views: null, spotifyId: null, youtubeId: null});
  const [tooltipMessage, setTooltipMessage] = useState(""); // Tooltip message state
  const [success, setSuccess] = useState({index: 0, state: false});
  const [failed, setFailed] = useState({index: 0, state: false});
  const [showError, setShowError] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
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
        successTest();
      })
      .catch((error) => console.error("Error fetching the JSON:", error));
  }, []);

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
        <Header setDarkMode={setDarkMode} darkMode={darkMode} setTooltipMessage={setTooltipMessage} />
        <Box sx={{ marginTop: "20px" }}>
          <Box>
            <SongDetails
              releaseDate={songData.releaseDate}
              views={songData.views}
              difficulty={songData.difficulty}
            />
          </Box>
          <Box mt={4}>
            <LayeredAudioPlayer
              layers={songData.Layers}
              songsList={songData.Songs}
              song={song}
              setSuccess={setSuccess}
              success={success}
              setFailed={setFailed}
              failed={failed}
              showError={showError}
              setShowError={setShowError}
              setShowPlayer={setShowPlayer}
              showPlayer={showPlayer}
              setTooltipMessage={setTooltipMessage}
              tooltipMessage={tooltipMessage}
            />
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

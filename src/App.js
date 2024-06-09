// src/App.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MusicPlayer from "./Components/MusicPlayer/MusicPlayer";
import SongDetails from "./Components/SongDetails/SongDetails";
import Header from "./Components/Header/Header";
import ErrorPopup from "./Components/ErrorPopup/ErrorPopup";

const App = ({ setDarkMode, darkMode }) => {
  const [songData, setSongData] = useState(null);
  const [song, setSong] = useState({ id: null, title: null, difficulty: null});
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const difficultyEnum = {1 : "קל", 2: "בינוני", 3: "קשה"};
  useEffect(() => {
    fetch("/dummyData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(difficultyEnum[data.difficulty]);
        data.difficulty = difficultyEnum[data.difficulty];
        setSong({ id: data.songId, title: data.songTitle, views: data.views});
        setSongData(data);
        successTest();
      })
      .catch((error) => console.error("Error fetching the JSON:", error));
  }, []);

  const successTest = () => {
    const dateStorage = localStorage.getItem("successTime");
    if (dateStorage) {
      const successDate = new Date(dateStorage);
      const now = new Date();
      const compareDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      if (successDate.getTime() === compareDate.getTime()) {
        setSuccess(true);
      }
    } else {
      setSuccess(false);
      localStorage.setItem("success", "false");
    }
  };

  if (!songData) return <div>Loading...</div>;

  return (
    <>
      <Box maxWidth="sm" margin="auto">
        <Header setDarkMode={setDarkMode} darkMode={darkMode} />
        <Box sx={{ marginTop: "20px" }}>
          <Box mt={4}>
            <SongDetails
              releaseDate={songData.releaseDate}
              views={songData.views}
              difficulty={songData.difficulty}
            />
          </Box>
          <Box mt={4}>
            <MusicPlayer
              layers={songData.Layers}
              songsList={songData.Songs}
              song={song}
              setSuccess={setSuccess}
              success={success}
              showError={showError}
              setShowError={setShowError}
              setShowPlayer={setShowPlayer}
              showPlayer={showPlayer}
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

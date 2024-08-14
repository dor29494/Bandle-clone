import { Box, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import shirdle_songs from "../../shirdle_songs.json";
import { showErrorState } from "../../state";
import {
  addPlayedSong,
  clearPlayedSongsByCategory,
  getPlayedSongsByCategory,
} from "../../utils/indexedDBUtils"; // Import the utility
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import LayeredAudioPlayer from "../LayeredAudioPlayer/LayeredAudioPlayer";
import SongDetails from "../SongDetails/SongDetails";
import categories from "./categories.json";

const difficultyEnum = { 1: "קל", 2: "בינוני", 3: "קשה" };

const createAutoCompleteList = (songs) => {
  return songs.map((song) => ({
    id: song.songId,
    title: song.songTitle,
  }));
};

const Categories = () => {
  const [song, setSong] = useState({
    id: null,
    title: null,
    views: null,
    spotifyId: null,
    youtubeId: null,
  });

  const [selectedSong, setSelectedSong] = useState(null);
  const [layers, setLayers] = useState([]);
  const [songsList, _] = useState(createAutoCompleteList(shirdle_songs));
  const [success, setSuccess] = useState({ index: 0, state: false });
  const [failed, setFailed] = useState({ index: 0, state: false });
  const [showError, setShowError] = useRecoilState(showErrorState);
  const currentCategory = useRef(null);

  const songListIdsRef = useRef(shirdle_songs.map((song) => song.songId));

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

  const handleCategoryClick = async (category) => {
    const categoryId = currentCategory.current.id;
    const songIds = category?.allSongIds
      ? songListIdsRef.current
      : category.songIds;

    let playedSongs = await getPlayedSongsByCategory(categoryId);

    if (playedSongs.length >= songIds.length) {
      await clearPlayedSongsByCategory(categoryId);
      playedSongs = [];
    }

    // Filter out played songs
    const remainingSongs = songIds.filter(
      (id) => !playedSongs.some((song) => song.songId === id)
    );

    const randomSongId =
      remainingSongs[Math.floor(Math.random() * remainingSongs.length)];

    const selectedSong = shirdle_songs.find(
      (song) => song.songId === randomSongId
    );
    selectedSong.difficulty = difficultyEnum[selectedSong.difficulty];
    setSong({
      id: selectedSong.songId,
      title: selectedSong.songTitle,
      views: selectedSong.views,
      spotifyId: selectedSong.media.spotifyId,
      youtubeId: selectedSong.media.youtubeId,
    });

    setSelectedSong(selectedSong);

    const layers = fetchLayerData(selectedSong.songId);
    setLayers(layers);
  };

  const resetCategories = () => {
    setSelectedSong(null);
    setLayers([]);
    setSuccess({ index: 0, state: false });
    setFailed({ index: 0, state: false });
  };

  const onFinish = (songId) => {
    const categoryId = currentCategory.current.id;
    addPlayedSong(songId, categoryId);
  };

  return (
    <Box>
      {!selectedSong ? (
        <Box
          marginTop="10px"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
        >
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant="contained"
              onClick={() => {
                currentCategory.current = category;
                handleCategoryClick(category);
              }}
              sx={{
                borderRadius: "20px",
                borderBottom: `2px solid ${category.style.borderColor}`,
                backgroundColor: `${category.style.backgroundColor}`,
                width: "151px",
                height: "151px",
                ":hover": {
                  borderBottom: `2px solid ${category.style.hoverBorderColor}`,
                  backgroundColor: `${category.style.hoverBackgroundColor}`,
                },
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box display="inline-flex">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75 18.9999L9.75 6.86126C9.75 6.75123 9.82194 6.65413 9.92721 6.62209L18.4272 4.03514C18.5878 3.98626 18.75 4.10642 18.75 4.2743V13.4377C18.3516 13.3152 17.9289 13.2498 17.5 13.2498C15.5628 13.2498 13.75 14.5827 13.75 16.4998C13.75 18.417 15.5628 19.7499 17.5 19.7499C19.4372 19.7499 21.25 18.417 21.25 16.4999V4.2743C21.25 2.42761 19.466 1.10576 17.6993 1.64345L9.19931 4.23041C8.04138 4.58282 7.25 5.65089 7.25 6.86126L7.25 15.9377C6.85165 15.8152 6.42887 15.7498 6 15.7498C4.06278 15.7498 2.25 17.0827 2.25 18.9999C2.25 20.917 4.06278 22.2499 6 22.2499C7.93722 22.2499 9.75 20.917 9.75 18.9999Z"
                    fill="white"
                  />
                </svg>
              </Box>
              <Box fontSize="16px" color={"#fff"} fontWeight={"bold"}>
                {category.title}
              </Box>
            </Button>
          ))}
        </Box>
      ) : (
        <Box sx={{ marginTop: "20px" }}>
          <Box>
            <SongDetails
              releaseDate={selectedSong.releaseDate}
              views={selectedSong.views}
              difficulty={selectedSong.difficulty}
            />
          </Box>
          <Box mt={4}>
            <LayeredAudioPlayer
              key={song.id}
              layers={layers}
              songsList={songsList}
              success={success}
              setSuccess={setSuccess}
              failed={failed}
              setFailed={setFailed}
              song={song}
              onFinish={onFinish}
            />
          </Box>
        </Box>
      )}
      {showError && (
        <CustomSnackbar
          alertOpen={true}
          handleCloseAlert={() => setShowError(false)}
          message={"ניחוש שגוי"}
        />
      )}

      {(success.state || failed.state) && (
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              setLayers([]);
              setSuccess({ index: 0, state: false });
              setFailed({ index: 0, state: false });
              handleCategoryClick(currentCategory.current, selectedSong.songId);
            }}
          >
            שיר הבא
          </Button>
          <Button variant="contained" onClick={resetCategories}>
            חזרה לקטגוריות
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Categories;

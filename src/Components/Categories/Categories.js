import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import shirdle_songs from "../../shirdle_songs.json";
import SongDetails from "../SongDetails/SongDetails";
import LayeredAudioPlayer from "../LayeredAudioPlayer/LayeredAudioPlayer";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { useRecoilState } from "recoil";
import { showErrorState } from "../../state";
import {
  addPlayedSong,
  getPlayedSongsByCategory,
  clearPlayedSongsByCategory,
} from "../../utils/indexedDBUtils"; // Import the utility

const difficultyEnum = { 1: "קל", 2: "בינוני", 3: "קשה" };

const createAutoCompleteList = (songs) => {
  return songs.map((song) => ({
    id: song.songId,
    title: song.songTitle,
  }));
};

const Categories = () => {
  const categories = [
    {
      title: "Pop Songs",
      id: "pop",
      songIds: [
        "c2ac1c5e-43ca-4166-9e48-29588daeaae8",
        "bfdd796d-f66e-4b14-988c-1c088ddfb105",
        "13b96f8a-2d32-481c-ac01-51cce89d6964",
      ],
    },
    // Add more categories as needed
  ];

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

  const handleCategoryClick = async (songIds) => {
    const categoryId = currentCategory.current.id;

    let playedSongs = await getPlayedSongsByCategory(categoryId);

    console.log(playedSongs);
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
      <Typography variant="h4" gutterBottom>
        Select a Category
      </Typography>
      {!selectedSong ? (
        <Box>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => {
                currentCategory.current = category;
                handleCategoryClick(category.songIds);
              }}
              sx={{ marginBottom: "10px", display: "block" }}
            >
              {category.title}
            </Button>
          ))}
        </Box>
      ) : (
        <Box>
          <SongDetails
            releaseDate={selectedSong.releaseDate}
            views={selectedSong.views}
            difficulty={selectedSong.difficulty}
          />
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
              handleCategoryClick(
                currentCategory.current.songIds,
                selectedSong.songId
              );
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

import { Box, IconButton } from '@mui/material';
import { YouTube, MusicNote, Share } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

function SocialNetwork({ youTubeId, spotifyId }) {
  const spotifyLink = useRef(process.env.REACT_APP_SPOTIFY_BASE + spotifyId);
  const youtubeLink = useRef(process.env.REACT_APP_YOUTUBE_BASE + youTubeId);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    spotifyLink.current = process.env.REACT_APP_SPOTIFY_BASE + spotifyId;
    youtubeLink.current = process.env.REACT_APP_YOUTUBE_BASE + youTubeId;
  }, [youTubeId, spotifyId]);

  const handleShare = () => {
    const stats = JSON.parse(localStorage.getItem('userStats')) || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const totalGuesses = Object.values(stats).reduce((a, b) => a + b, 0);
    const shareText = `סטטיסטיקות ניחושים:
${Object.keys(stats).map(key => `${key === '6' ? 'X' : key}: ${stats[key]} (${((stats[key] / totalGuesses) * 100).toFixed(2)}%)`).join('\n')}
סה"כ ניחושים: ${totalGuesses}`;

    navigator.clipboard.writeText(shareText)
      .then(() => {
        setAlertMessage("סטטיסטיקות הועתקו ללוח!");
        setAlertOpen(true);
      })
      .catch(() => {
        setAlertMessage("שגיאה בהעתקת הסטטיסטיקות.");
        setAlertOpen(true);
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2} sx={{ flexBasis: "80%", margin: 'auto' }}>
        <IconButton target="_blank" href={youtubeLink.current ? youtubeLink.current.toString() : ""} color="primary" aria-label="YouTube">
          <YouTube fontSize="medium" />
        </IconButton>
        <IconButton target="_blank" href={spotifyLink.current ? spotifyLink.current.toString() : ""} color="primary" aria-label="Music">
          <MusicNote fontSize="medium" />
        </IconButton>
        <IconButton onClick={handleShare} color="primary" aria-label="Share">
          <Share fontSize="medium" />
        </IconButton>
      </Box>
      <CustomSnackbar
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        message={alertMessage}
      />
    </>
  );
}

export default SocialNetwork;

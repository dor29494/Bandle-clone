import { Box, IconButton } from '@mui/material'
import { YouTube, MusicNote } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react'

function SocialNetwork({ youTubeId, spotifyId }) {
  const spotifyLink = useRef(process.env.REACT_APP_SPOTIFY_BASE + spotifyId);
  const youtubeLink = useRef(process.env.REACT_APP_SPOTIFY_BASE + youTubeId);

  useEffect(() => {
    console.log(process.env.REACT_APP_SPOTIFY_BASE)
    spotifyLink.current = process.env.REACT_APP_SPOTIFY_BASE + spotifyId;
    youtubeLink.current = process.env.REACT_APP_YOUTUBE_BASE + youTubeId;
  }, [youTubeId, spotifyId]);

  console.log(youtubeLink.current)


  return (
    <Box display="flex" justifyContent="center" mb={2} sx={{ flexBasis: "80%", margin: 'auto' }}>
      <IconButton target="_blank" href={youtubeLink.current ? youtubeLink.current.toString() : ""} color="primary" aria-label="YouTube">
        <YouTube fontSize="medium" />
      </IconButton>
      <IconButton target="_blank" href={spotifyLink.current ? spotifyLink.current.toString() : ""} color="primary" aria-label="Music">
        <MusicNote fontSize="medium" />
      </IconButton>
    </Box>
  )
}

export default SocialNetwork
import { Box, IconButton } from '@mui/material'
import { YouTube, MusicNote, PlayArrow, Language } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react'

function SocialNetwork({youTubeId, spotifyId}) {
  const spotifyLink = useRef(null);
  const youtubeLink = useRef(null);

  useEffect(() => {
    spotifyLink.current = process.env.REACT_APP_SPOTIFY_BASE + spotifyId;
    youtubeLink.current = process.env.REACT_APP_YOUTUBE_BASE + youTubeId;
  }, [youTubeId, spotifyId]);


  return (
    <Box display="flex" justifyContent="center" mb={2} sx={{flexBasis: "80%", margin: 'auto'}}>
    <IconButton href={youtubeLink.current} color="primary" aria-label="YouTube">
      <YouTube fontSize="medium" />
    </IconButton>
    <IconButton href={spotifyLink.current} color="primary" aria-label="Music">
      <MusicNote fontSize="medium"/>
    </IconButton>
  </Box>
  )
}

export default SocialNetwork
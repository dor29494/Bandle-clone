import { Box, IconButton } from '@mui/material'
import { YouTube, MusicNote, PlayArrow, Language } from '@mui/icons-material';
import React from 'react'

function SocialNetwork() {
  return (
    <Box display="flex" justifyContent="center" mb={2}>
    <IconButton color="primary" aria-label="YouTube">
      <YouTube />
    </IconButton>
    <IconButton color="primary" aria-label="Music">
      <MusicNote />
    </IconButton>
    <IconButton color="primary" aria-label="Play">
      <PlayArrow />
    </IconButton>
    <IconButton color="primary" aria-label="Language">
      <Language />
    </IconButton>
  </Box>
  )
}

export default SocialNetwork
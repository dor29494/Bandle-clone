// src/components/SongDetails.js
import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';

const SongDetails = ({ releaseDate, views, difficulty }) => {
  return (
    <Paper elevation={3} sx={{ padding: '16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'  }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="textSecondary">שוחרר בשנת</Typography>
        <Typography variant="h6">{releaseDate}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="textSecondary">צפיות ביוטיוב</Typography>
        <Typography variant="h6">{views}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="textSecondary">קושי</Typography>
        <Typography variant="h6">{difficulty}</Typography>
      </Box>
    </Paper>
  );
};

export default SongDetails;

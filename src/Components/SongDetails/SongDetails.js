import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SongDetails = ({ releaseDate, views, difficulty }) => {
  return (
    <Box sx={{maxWidth: '95%', margin: 'auto'}}>
      <Typography variant='h6' textAlign='center' mb={2} fontWeight={300}> נחש את השיר לפי הסדר</Typography>
      <Paper elevation={3} sx={{ padding: '8px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '8px' }}>
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
    </Box>
  );
};

export default SongDetails;

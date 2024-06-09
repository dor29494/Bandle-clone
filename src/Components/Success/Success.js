import React, { useEffect } from 'react';
import Timer from '../Timer/Timer';
import { Box, Typography } from '@mui/material';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import { useTheme } from '@emotion/react';

const Success = ({ songTitle, songViews }) => {
  useEffect(() => {
    const now = new Date();
    const successTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
    localStorage.setItem('successTime', successTime);
  }, []);
const theme = useTheme();
console.log(theme.palette.primary.headerIcons)
  return (
    <Box display="flex" mt={4} flexDirection="column" justifyContent="center" alignItems="center" p={2} bgcolor={theme.palette.primary.successBg} borderRadius={2} boxShadow={3}>
      <Typography variant="h4" gutterBottom>
        Success!
      </Typography>
      <Typography variant="body1">
        {`Song Title: ${songTitle}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Song Views: ${songViews}`}
      </Typography>
      <SocialNetwork/>
      <Timer />
    </Box>
  );
};

export default Success;

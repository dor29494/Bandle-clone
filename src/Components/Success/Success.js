import React, { useEffect } from 'react';
import Timer from '../Timer/Timer';
import { Box } from '@mui/material';

const Success = ({ songTitle, songViews }) => {
  useEffect(() => {
    const now = new Date();
    const successTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
    localStorage.setItem('successTime', successTime);
  }, []);

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <h1>Success!</h1>
      <p>{`Song Title: ${songTitle}`}</p>
      <p>{`Song Views: ${songViews}`}</p>
      <Timer />
    </Box>
  );
};

export default Success;

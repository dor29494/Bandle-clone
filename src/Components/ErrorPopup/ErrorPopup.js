import React, { useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorPopup = ({ message, onClose, setShowPlayer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjusted breakpoint

  useEffect(() => {
    if (isMobile) {
      // setShowPlayer(false);
    }
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isMobile, onClose, setShowPlayer]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isMobile ? '20px' : '115px',
        left: isMobile ? '10px' : 'auto',
        right: isMobile ? '10px' : '35px',
        backgroundColor: '#ffebee',
        padding: '10px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: isMobile ? 'calc(100% - 20px)' : '400px',
        margin: isMobile ? '0' : '0 10px 10px 10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ErrorIcon color="error" sx={{ marginLeft: '8px' }} />
        <Typography variant="body1" color="error">
          {message}
        </Typography>
      </Box>
      <IconButton size="small" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ErrorPopup;

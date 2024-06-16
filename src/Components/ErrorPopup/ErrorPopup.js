import React, { useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorPopup = ({ message, onClose, setShowPlayer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        position: isMobile ? 'relative' : 'fixed',
        bottom: isMobile ? 'auto' : '115px',
        right: isMobile ? 'auto' : '35px',
        backgroundColor: '#ffebee',
        padding: '10px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: isMobile ? 'auto' : '400px',
        margin: isMobile ? '10px' : '0 10px 10px 10px',
        boxShadow: isMobile ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
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

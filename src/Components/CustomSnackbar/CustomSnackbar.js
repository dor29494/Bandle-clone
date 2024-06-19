import React from 'react';
import { Snackbar, Alert as MuiAlert, IconButton , useMediaQuery} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { useTheme } from '@emotion/react';

const CustomAlert = styled(MuiAlert)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default, // Use theme color here
  color: '#4caf50',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '10px 15px',
  paddingLeft: '25px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  '.MuiAlert-message': {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    gap: '2px',
    textAlign: 'center',
    flexGrow: 1,
    position: 'relative',
  },
}));

const CloseButton = styled(IconButton)`
  margin-left: -5px;
`;

const AlertSnackbar = styled(Snackbar)(({ theme }) => ({
  '.MuiPaper-root': {
    paddingLeft: '15px',
    backgroundColor: theme.palette.primary.snackBarBG, // Use theme color here
    width: 'calc(100% - 20px)', // Ensuring it fits well on all devices
    maxWidth: '600px', // Adjust maximum width
    margin: '0 auto', // Center horizontally
    left: 'unset', // Reset left position
    transform: 'none', // Reset transform
  },
}));

function CustomSnackbar({ alertOpen, handleCloseAlert, message }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <AlertSnackbar
      open={alertOpen}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: '20px' , marginBottom: isMobile ? undefined : '150px', minWidth: isMobile ? undefined : '350px'}}
    >
      <CustomAlert severity="success">
        <CloseButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseAlert}
        >
          <CloseIcon fontSize="small" />
        </CloseButton>
        {message}
      </CustomAlert>
    </AlertSnackbar>
  );
}

export default CustomSnackbar;

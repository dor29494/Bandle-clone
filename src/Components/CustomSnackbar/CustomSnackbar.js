import React from 'react';
import { Snackbar, Alert as MuiAlert, IconButton } from '@mui/material';
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
  },
}));

function CustomSnackbar({ alertOpen, handleCloseAlert, message }) {
  const theme = useTheme();
  return (
    <AlertSnackbar
      open={alertOpen}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ bottom: '20px' }}
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

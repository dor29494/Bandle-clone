import React, { useState } from 'react';
import { Snackbar, Alert as MuiAlert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const CustomAlert = styled(MuiAlert)`
  width: 100%;
  background-color: #ffffff;
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  padding-left: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
   .MuiAlert-message {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        gap: 2px;
        text-align: center;
        flex-grow: 1;
        position: relative;
   }
`;

const CloseButton = styled(IconButton)`
  margin-left: -5px;
`;

const AlertSnackbar = styled(Snackbar)`
.MuiPaper-root {
    padding-left: 15px;
  }
`

function CustomSnackbar({ alertOpen, handleCloseAlert, message }) {
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

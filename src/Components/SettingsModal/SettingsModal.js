// src/Components/SettingsModal/SettingsModal.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SettingsModal = ({ open, onClose, darkMode, setDarkMode }) => {
  const handleDarkMode = ()=>{
    setDarkMode(!darkMode);
    if(!darkMode){
      localStorage.setItem('darkMode', 'true');
    }
    else{
      localStorage.removeItem('darkMode');
    }
  }


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'right' }}>
        SETTINGS
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkMode}
              />
            }
            label="Dark mode"
            sx={{ display: 'block', mb: 2, }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Also share % found when sharing score"
            sx={{ display: 'block', mb: 2 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Also share streak when sharing score"
            sx={{ display: 'block', mb: 2 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Hide top bar with song released date"
            sx={{ display: 'block', mb: 2 }}
          />
        </Box>
        <Box mt={4}>
          <Typography variant="h6">ABOUT</Typography>
          <Typography variant="body2" gutterBottom>
            Bandle is a game designed and developed by a music loving, independent developer. 
            For any questions or suggestions get in touch on Twitter <a href="https://twitter.com/BandleGame">@BandleGame</a>.
          </Typography>
          <Typography variant="caption">v1.05</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;

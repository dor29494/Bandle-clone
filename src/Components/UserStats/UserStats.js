import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box, Grid, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function UserStats({ open, onClose, stats }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        סטטיסטיקות
      </DialogTitle>
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
      <DialogContent dividers>
        <Box>
          <Typography variant="body1" gutterBottom>1</Typography>
          <Typography variant="body1" gutterBottom>2</Typography>
          <Typography variant="body1" gutterBottom>3</Typography>
          <Typography variant="body1" gutterBottom>4</Typography>
          <Typography variant="body1" gutterBottom>5</Typography>
          <Typography variant="body1" gutterBottom>6</Typography>
          <Typography variant="body1" gutterBottom>X</Typography>
        </Box>
        <Box mt={2}>
          <Paper variant="outlined">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={4}>
                <Typography align="center">
                  {stats.found}/0<br />(0%)
                </Typography>
                <Typography align="center">נמצאו</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center">{stats.currentStreak}</Typography>
                <Typography align="center">רצף נוכחי</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="center">{stats.maxStreak}</Typography>
                <Typography align="center">רצף מקסימלי</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary">
          ייבוא או ייצוא של הסטטיסטיקות שלך
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserStats;

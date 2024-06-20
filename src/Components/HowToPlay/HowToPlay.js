import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box, Grid, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import TwitterIcon from '@mui/icons-material/Twitter';

function HowToPlay({ open, onClose }) {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" textAlign="center" sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize }, width: "100%" }}>איך לשחק</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{zIndex: '55'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <QueueMusicIcon
              sx={{
                fontSize: theme.breakpoints.down('sm') ? theme.icons.medium : theme.icons.large,
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize } }}>
                השיר שלנו מחולק לחמש שכבות שונות.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <AudiotrackIcon
              sx={{
                fontSize: theme.breakpoints.down('sm') ? theme.icons.medium : theme.icons.large,
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize } }}>
              עליכם לזהות את השיר בכמה שפחות צעדים.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MusicNoteIcon
              sx={{
                fontSize: theme.breakpoints.down('sm') ? theme.icons.medium : theme.icons.large,
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize } }}>
                זהו את השיר ושתפו את התוצאה עם חבריכם!
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button onClick={onClose} variant="contained" color="primary">
          להתחיל לשחק
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HowToPlay;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box, Grid, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import TwitterIcon from '@mui/icons-material/Twitter';

function HowToPlay({ open, onClose }) {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize } }}>איך משחקים</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
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
              הלהקה שלנו תנגוד פזמון של שיר פופולרי, אך חלק מהמוזיקאים מאחרים...
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
              נחשו את השיר לפי פעימות המתופף, אם לא, אולי קו הבס יעזור.
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
              ענו עם כמה שפחות מוזיקאים מנגנים ושתפו את התוצאה שלכם!
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TwitterIcon
              sx={{
                fontSize: theme.breakpoints.down('sm') ? theme.icons.medium : theme.icons.large,
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom sx={{ [theme.breakpoints.down('sm')]: { fontSize: theme.typography.h6.fontSize } }}>
              לעזרה נוספת, עקבו אחרי @BandleGame בטוויטר.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          לשחק
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HowToPlay;

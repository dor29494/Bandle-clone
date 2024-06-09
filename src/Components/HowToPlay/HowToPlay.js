import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function HowToPlay({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">איך משחקים</Typography>
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
        <Typography variant="subtitle1" gutterBottom>
          כותרת משנה 1
        </Typography>
        <Typography gutterBottom>
          הלהקה שלנו תנגוד פזמון של שיר פופולרי, אך חלק מהמוזיקאים מאחרים...
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          כותרת משנה 2
        </Typography>
        <Typography gutterBottom>
          נחשו את השיר לפי פעימות המתופף, אם לא, אולי קו הבס יעזור.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          כותרת משנה 3
        </Typography>
        <Typography gutterBottom>
          ענו עם כמה שפחות מוזיקאים מנגנים ושתפו את התוצאה שלכם!
        </Typography>
        <Typography gutterBottom>
          לרמזים יומיים, עקבו אחר @BandleGame בטוויטר.
        </Typography>
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

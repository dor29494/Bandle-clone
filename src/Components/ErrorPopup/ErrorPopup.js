import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ErrorPopup = ({ message, onClose }) => {
    return (
      <Box sx={{ position: 'relative', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="error">{message}</Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };
  export default ErrorPopup;
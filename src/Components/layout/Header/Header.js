import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="help">
          <HelpOutlineIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="stats">
          <BarChartIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          שירדל
        </Typography>
        <IconButton color="inherit" aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

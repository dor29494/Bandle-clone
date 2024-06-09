import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import HowToPlay from '../HowToPlay/HowToPlay';
import UserStats from '../UserStats/UserStats';
function Header() {
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const [stats, setStats] = useState({
    found: 0,
    currentStreak: 0,
    maxStreak: 0
  });

  useEffect(() => {
    const hasSeenHowToPlay = localStorage.getItem('hasSeenHowToPlay');
    if (!hasSeenHowToPlay) {
      setHowToPlayOpen(true);
      localStorage.setItem('hasSeenHowToPlay', 'true');
    }
  }, []);

  const handleHowToPlayOpen = () => {
    setHowToPlayOpen(true);
  };

  const handleHowToPlayClose = () => {
    setHowToPlayOpen(false);
  };

  const handleStatsOpen = () => {
    setStatsOpen(true);
  };

  const handleStatsClose = () => {
    setStatsOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="help" onClick={handleHowToPlayOpen}>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="stats" onClick={handleStatsOpen}>
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
      <HowToPlay open={howToPlayOpen} onClose={handleHowToPlayClose} />
      <UserStats open={statsOpen} onClose={handleStatsClose} stats={stats} />
    </>
  );
}

export default Header;

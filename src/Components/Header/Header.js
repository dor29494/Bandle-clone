import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import HowToPlay from '../HowToPlay/HowToPlay';
import UserStats from '../UserStats/UserStats';
import SettingsModal from '../SettingsModal/SettingsModal';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/system';

function Header({ setDarkMode, darkMode }) {
  const [modalsOpen, setModalsOpen] = useState({
    howToPlay: false,
    stats: false,
    settings: false
  });

  const theme = useTheme();
  const [stats, setStats] = useState({
    found: 0,
    currentStreak: 0,
    maxStreak: 0
  });

  const handleDarkMode = ()=>{
    setDarkMode(!darkMode);
    if(!darkMode){
      localStorage.setItem('darkMode', 'true');
    }
    else{
      localStorage.removeItem('darkMode');
    }
  }
  useEffect(() => {
    const hasSeenHowToPlay = localStorage.getItem('hasSeenHowToPlay');
    if (!hasSeenHowToPlay) {
      setModalsOpen(prevState => ({ ...prevState, howToPlay: true }));
      localStorage.setItem('hasSeenHowToPlay', 'true');
    }
  }, []);

  const toggleModal = (modalName) => {
    setModalsOpen(prevState => ({ ...prevState, [modalName]: !prevState[modalName] }));
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.headerBg }}>
        <Toolbar>
          <IconButton edge="start" color={theme.palette.primary.headerIcons}  aria-label="help" onClick={() => toggleModal('howToPlay')}>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color={theme.palette.primary.headerIcons}  aria-label="stats" onClick={() => toggleModal('stats')}>
            <BarChartIcon />
          </IconButton>
          <Typography variant="h6" color={theme.palette.primary.headerIcons} sx={{ flexGrow: 1, textAlign: 'center' }}>
            שירדל
          </Typography>
          <IconButton color={theme.palette.primary.headerIcons}  aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton edge="end" color={theme.palette.primary.headerIcons}  aria-label="settings" onClick={() => toggleModal('settings')}>
            {/* <SettingsIcon /> */}
            <IconButton
            sx={{ ml: 1 }}
            onClick={handleDarkMode}
            color="inherit"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          </IconButton>
        </Toolbar>
      </AppBar>
      <HowToPlay open={modalsOpen.howToPlay} onClose={() => toggleModal('howToPlay')} />
      <UserStats open={modalsOpen.stats} onClose={() => toggleModal('stats')} stats={stats} />
      {/* <SettingsModal open={modalsOpen.settings} onClose={() => toggleModal('settings')} darkMode={darkMode} setDarkMode={setDarkMode} /> */}
    </>
  );
}

export default Header;

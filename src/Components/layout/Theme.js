// src/Components/layout/Theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      headerBg: '#FFFFFF',
      headerIcons: '#000000'
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      fontSize: '14px',
    },
  },
});

const darkTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      headerBg: '#202124',
      headerIcons: '#E0E0E0'
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      fontSize: '14px',
    },
  },
});

export { lightTheme, darkTheme };

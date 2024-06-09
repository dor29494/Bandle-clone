// src/index.js
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './Components/layout/Theme';
import './index.css';

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  useEffect(()=>{
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkMode);
  },[])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App setDarkMode={setDarkMode} darkMode={darkMode} />
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// src/index.js
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './Components/layout/Theme';
import './index.css';
import { RecoilRoot } from 'recoil';
import analytics from './analytics';

// Initialize the analytics instance
analytics.page();

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkMode);
  }, []);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App setDarkMode={setDarkMode} darkMode={darkMode} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);

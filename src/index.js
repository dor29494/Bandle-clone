// src/index.js
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './Components/layout/Theme';
import './index.css';
import { RecoilRoot } from 'recoil';

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  useEffect(()=>{
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkMode);
  },[])
  return (
    <RecoilRoot>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App setDarkMode={setDarkMode} darkMode={darkMode} />
    </ThemeProvider>
    </RecoilRoot>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button, Paper } from '@mui/material';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import SongDetails from './Components/SongDetails/SongDetails';

const App = () => {
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    fetch('/dummyData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setSongData(data))
      .catch((error) => console.error('Error fetching the JSON:', error));
  }, []);

  if (!songData) return <div>Loading...</div>;

  return (
    <Box maxWidth="md" margin="auto">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bandle Clone
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Guess the song, one instrument at a time!
          </Typography>
        </Paper>
        <Box mt={4}>
          <SongDetails
            releaseDate={songData.CreateDate}
            views={songData.Views}
            difficulty="Medium (par 3)"
          />
        </Box>
        <Box mt={4}>
          <MusicPlayer layers={songData.Layers} />
        </Box>
      </Container>
    </Box>
  );
};

export default App;

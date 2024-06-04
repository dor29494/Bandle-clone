// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button, Paper } from '@mui/material';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import SongDetails from './Components/SongDetails/SongDetails';
import Success from './Components/Success/Success';

const App = () => {
  const [songData, setSongData] = useState(null);
  const [song, setSong] = useState({id: null, title: null})
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/dummyData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSong({id: data.SongId, title: data.SongTitle});
        setSongData(data)
        successTest();
      
      }
      )
      .catch((error) => console.error('Error fetching the JSON:', error));
  }, []);
  const successTest = ()=>{
    const dateStorage = localStorage.getItem('successTime');
    if(dateStorage){
      const successDate = new Date(dateStorage);
      const now = new Date();
      const compareDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const success = localStorage.getItem('success') === 'success';
      if (successDate.getTime() === compareDate.getTime()) {
        setSuccess(true);
      }
    }
    else{
      setSuccess(false);
      localStorage.setItem("success", "false");
    }
  };

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
          <MusicPlayer layers={songData.Layers} songsList={songData.Songs} song={song} setSuccess={setSuccess} success={success} />
          { success &&
          <Success songTitle={songData.SongTitle} songViews={songData.Views}/>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default App;

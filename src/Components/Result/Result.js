import React, { useEffect } from "react";
import Timer from "../Timer/Timer";
import { Box, Grid, Typography } from "@mui/material";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import { useTheme } from "@emotion/react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SuccessIcon from "../Icons/SuccessIcon";

const Result = ({ isSuccess, song }) => {
  useEffect(() => {
    const now = new Date();
    const lastResultTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ).toISOString();
    localStorage.setItem("lastResultTime", lastResultTime);
    localStorage.setItem('lastResult', isSuccess ? 'true' : 'false');
  }, []);

  const theme = useTheme();

  return (
    <Box
      display="flex"
      margin="auto"
      mt={4}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      bgcolor={
        isSuccess
          ? theme.palette.primary.successBg
          : theme.palette.primary.failureBg
      }
      borderRadius={2}
      boxShadow={3}
      width="300px" // Adjust the width as needed
    >
      <Grid container direction="column" spacing={1} alignItems="center">
      {isSuccess &&(
        <SuccessIcon width="35px" height="35px" color="green" borderColor="black" backgroundColor="white"/>
      )}
        <Grid item sx={{marginLeft: 'auto', marginRight: '20px'}}>
          <Typography variant="body1">
            <strong>שם השיר:</strong> {song.title}
          </Typography>
        </Grid>
        <Grid item sx={{marginLeft: 'auto', marginRight: '20px'}}>
          <Typography variant="body1" gutterBottom>
            <strong>מספר צפיות:</strong> {song.views}
          </Typography>
        </Grid>
        <Grid item>
          <SocialNetwork spotifyId={song.spotifyId} youTubeId={song.youtubeId} />
        </Grid>
        <Grid item>
          <Timer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Result;

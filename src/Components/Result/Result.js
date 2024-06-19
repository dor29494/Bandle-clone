import React, { useEffect } from "react";
import Timer from "../Timer/Timer";
import { Box, Grid, Typography } from "@mui/material";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import { useTheme } from "@emotion/react";
import Confetti from "react-confetti";
import zIndex from "@mui/material/styles/zIndex";

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
      gap={2}
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
      boxShadow={`0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px ${theme.palette.primary.songDetailsBoxShadow}`}
      width="100%"
      maxWidth="480px"
      position="relative"
    >
      {isSuccess && (
        <>
          <Confetti style={{zIndex: 0, pointerEvents: "auto", width: "100%", maxHeight: "200px"}} />
          <Typography variant="h5" component="div" color="green">
            ניחוש נכון!
          </Typography>
        </>
      )}
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item sx={{ marginLeft: 'auto', marginRight: '20px' }}>
          <Typography variant="body1">
            <strong>שם השיר:</strong> {song.title}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: '20px' }}>
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

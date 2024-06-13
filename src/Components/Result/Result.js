import React, { useEffect } from "react";
import Timer from "../Timer/Timer";
import { Box, Typography } from "@mui/material";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import { useTheme } from "@emotion/react";

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
    >
      {isSuccess && (
        <Typography variant="h4" gutterBottom>
          Success!
        </Typography>
      )}
      <Typography variant="body1">{`Song Title: ${song.title}`}</Typography>
      <Typography variant="body1" gutterBottom>
        {`Song Views: ${song.views}`}
      </Typography>
      <SocialNetwork spotifyId={song.spotifyId} youTubeId={song.youtubeId} />
      <Timer />
    </Box>
  );
};

export default Result;

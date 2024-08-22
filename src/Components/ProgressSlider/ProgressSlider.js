import React from "react";
import { Box, Slider } from "@mui/material";
import { useTheme } from "@emotion/react";

const ProgressSlider = ({ audioRef, progress, setProgress }) => {
  const theme = useTheme();
  const handleSliderChange = (event, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = (newValue / 100) * audio.duration;
    setProgress(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Slider
        value={progress}
        onChange={handleSliderChange}
        aria-labelledby="continuous-slider"
        sx={{
          color: theme.palette.primary.progressSliderBG,
          // width: "90%",
          mt: 1,
          "& .MuiSlider-thumb": {
            width: 0,
            height: 0,
          },
          "& .MuiSlider-rail": {
            height: "6px",
          },
        }}
      />
    </Box>
  );
};

export default ProgressSlider;

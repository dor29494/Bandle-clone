import React from "react";
import { Box, Slider } from "@mui/material";

const ProgressSlider = ({ audioRef, progress, setProgress }) => {
  const handleSliderChange = (event, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = (newValue / 100) * audio.duration;
    setProgress(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider
        
        value={progress}
        onChange={handleSliderChange}
        aria-labelledby="continuous-slider"
        sx={{
          width: "90%",
          mt: 2,
          '& .MuiSlider-thumb': {
            width: 0,
            height: 0,
          },
        }}
      />
    </Box>
  );
};

export default ProgressSlider;

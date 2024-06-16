import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import ProgressSlider from "../ProgressSlider/ProgressSlider";

const AudioPlayer = ({ file, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [audioRef, setProgress]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [file]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <audio ref={audioRef} style={{ display: 'none' }} controls>
        <source src={file} type="audio/mpeg" />
        הדפדפן שלך אינו תומך באלמנט שמע.
      </audio>
      <ProgressSlider audioRef={audioRef} progress={progress} setProgress={setProgress} />
    </Box>
  );
};

export default AudioPlayer;

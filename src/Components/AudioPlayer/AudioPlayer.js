import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ProgressSlider from "../ProgressSlider/ProgressSlider";

const AudioPlayer = ({ file, progress, setProgress, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);

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
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [file, isPlaying]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, width: "100%" }}>
      <audio ref={audioRef} style={{ width: "100%", display: 'none'}} controls>
        <source src={file} type="audio/mpeg" />
        הדפדפן שלך אינו תומך באלמנט שמע.
      </audio>
      <ProgressSlider audioRef={audioRef} progress={progress} setProgress={setProgress} />
    </Box>
  );
};

export default AudioPlayer;

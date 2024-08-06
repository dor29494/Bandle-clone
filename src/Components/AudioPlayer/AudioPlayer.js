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
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);

        if (progress === 100) {
          setIsPlaying(false);
        }
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef, setProgress]);

  useEffect(() => {
    // Reset progress when audioRef changes
    setProgress(0);

    // Pause and load new audio file when file changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [file, audioRef]);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <audio ref={audioRef} style={{ display: "none" }} controls>
        <source src={file} type="audio/mpeg" />
        הדפדפן שלך אינו תומך באלמנט שמע.
      </audio>
      <ProgressSlider
        audioRef={audioRef}
        progress={progress}
        setProgress={setProgress}
      />
    </Box>
  );
};

export default AudioPlayer;

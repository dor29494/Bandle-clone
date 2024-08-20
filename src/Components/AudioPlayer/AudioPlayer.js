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
  }, [setProgress]);

  useEffect(() => {
    // Reset progress when audioRef changes
    setProgress(0);

    const audio = audioRef.current;

    if (audio) {
      const handleLoadedMetadata = () => {
        if (isPlaying) {
          audio.play().catch((error) => {
            console.warn("Play interrupted: ", error);
          });
        }
      };

      // Pause the current audio if playing
      audio.pause();

      // Update the source directly and let the browser load the audio file
      audio.src = file;

      // Attach the metadata loaded handler
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        // Pause and clear the audio source on unmount to prevent play errors
        audio.pause();
        audio.src = "";
      };
    }
  }, [file, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && !audio.src) return; // Return if the audio src is not set yet

    if (isPlaying) {
      audio.play().catch((error) => {
        console.warn("Play interrupted: ", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      if (audio) {
        // Cleanup on unmount to prevent errors
        audio.pause();
      }
    };
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

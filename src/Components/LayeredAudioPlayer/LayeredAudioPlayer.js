import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Box, CardContent, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  availableSongsState,
  failedState,
  layersState,
  showErrorState,
  showPlayerState,
  songsListState,
  songState,
  successState,
  tooltipMessageState,
} from "../../state";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import PauseButton from "../Buttons/PauseButton";
import PlayButton from "../Buttons/PlayButton";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import GuessSkip from "../GuessSkip/GuessSkip";
import BassIcon from "../Icons/BassIcon";
import DrumsIcon from "../Icons/DrumsIcon";
import OtherMelodicsIcon from "../Icons/OtherMelodicsIcon";
import PianoGuitarIcon from "../Icons/PianoGuitarIcon";
import VoiceIcon from "../Icons/VoiceIcon";
import Result from "../Result/Result";

const LayeredAudioPlayer = ({ darkMode }) => {
  const [layers] = useRecoilState(layersState);
  const [songsList] = useRecoilState(songsListState);
  const [song] = useRecoilState(songState);
  const [success, setSuccess] = useRecoilState(successState);
  const [failed, setFailed] = useRecoilState(failedState);
  const [showError, setShowError] = useRecoilState(showErrorState);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerState);
  const [tooltipMessage, setTooltipMessage] =
    useRecoilState(tooltipMessageState);
  const setAvailableSongs = useSetRecoilState(availableSongsState);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeLayers, setActiveLayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [layerClickAlert, setLayerClickAlert] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [skipMessage, setSkipMessage] = useState("");
  const [levelsArePlayed, setLevelsArePlayed] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const isShow = !success.state && !failed.state;
  const levelsCounter = useRef(0);

  useEffect(() => {
    if (layers) {
      const initializedLayers = layers.map((layer, index) => ({
        ...layer,
        isActive: index === 0,
      }));
      setActiveLayers(initializedLayers);
    }

    setAvailableSongs(songsList.map((x) => x.title));

    const tooltipTimeout = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(tooltipTimeout);
  }, [layers, songsList, setAvailableSongs]);

  const updateStatistics = (isSuccess) => {
    const stats = JSON.parse(localStorage.getItem("userStats")) || {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    if (isSuccess) {
      stats[activeLayerIndex + 1]++;
    }
    if (activeLayerIndex === 4) {
      stats[6]++;
    }
    localStorage.setItem("userStats", JSON.stringify(stats));
  };

  const onGuessSuccess = () => {
    setSuccess((prev) => ({ ...prev, state: true, index: activeLayerIndex }));
    window.gtag("event", "success", {
      songId: song.id,
      step: activeLayerIndex,
    });
    setShowError(false);
    updateStatistics(true);

    setIsPlaying(true);
  };

  const handleSkip = () => {
    setShowPlayer(true);
    setIsPlaying(true);
    levelsCounter.current++;
    setFailed((prev) => ({
      ...prev,
      state: levelsCounter.current === 5,
      index: activeLayerIndex,
    }));
    updateStatistics(false);
    moveToNextLayer();
    // setShowTooltip(true);
    // because of autoplay need to set that level is played
    setLevelsArePlayed((prev) => ({ ...prev, [activeLayerIndex + 1]: true }));
  };

  const handleLayerClick = (index) => {
    if (success.state || failed.state) {
      setSkipMessage("אין אפשרות לבצע דילוג בשלב זה");
      setLayerClickAlert(true);
      return;
    }
    if (!levelsArePlayed[activeLayerIndex]) {
      setSkipMessage(
        levelsCounter.current < 4
          ? "אנא הפעל את הרצועה לפני דילוג"
          : "אנא הפעל את הרצועה"
      );
      setLayerClickAlert(true);
      return;
    }

    if (myIndex < index) {
      handleSkip();
    }
    // if (index === activeLayerIndex + 1) {
    //   handleSkip();
    // } else {
    //   setSkipMessage("אפשר לדלג רק על רצועה אחת");
    //   setLayerClickAlert(true);
    // }
  };

  const handlePlayPause = (forcePlay = false) => {
    if (forcePlay) {
      setIsFirstPlay(true);
      setIsPlaying(true);
      setShowPlayer(true);
      setLevelsArePlayed((prev) => ({ ...prev, [activeLayerIndex]: true }));
    } else {
      if (!isFirstPlay) {
        setIsFirstPlay(true);
      }
      setIsPlaying((prev) => !prev);
      if (!isPlaying) {
        setShowPlayer((prev) => true);
        setLevelsArePlayed((prev) => ({ ...prev, [activeLayerIndex]: true }));
      }
    }

    if (isFirstPlay) {
      window.gtag("event", "played", {
        songId: song.id,
        step: activeLayerIndex,
      });
    }
  };

  const getLayersColors = (index) => {
    if (success.state && index === success.index) {
      return { border: "#6A9D6A", background: "#E761F7" };
    }
    if (failed.state && index === failed.index) {
      return { border: "#974C50", background: "#E761F7" };
    }
    if (success.state || failed.state) {
      if (index < (success.state ? success.index : failed.index)) {
        return { border: "#FFD700", background: "#E761F7" };
      }
      return { border: "#FFFFFF", background: "#D3D3D3" };
    }
    if (index <= activeLayerIndex) {
      return { border: "#FFD700", background: "#E761F7" };
    }
    return { border: "#A9A9A9", background: "#C2C7D1" };
  };

  const moveToNextLayer = () => {
    if (activeLayerIndex < activeLayers.length - 1) {
      const updatedLayers = activeLayers.map((layer, index) => {
        if (index === activeLayerIndex + 1) {
          return { ...layer, isActive: true };
        }
        return layer;
      });
      setActiveLayers(updatedLayers);
      setActiveLayerIndex(activeLayerIndex + 1);
      localStorage.setItem("layerIndex", activeLayerIndex + 1);
    }
  };

  const handleCloseAlert = () => {
    setLayerClickAlert(false);
  };

  const activeLayer = activeLayers[activeLayerIndex];
  const vocalsLayer = activeLayers[4] || null;

  const getIcon = (layerIndex) => {
    switch (layerIndex) {
      case 0:
        return <DrumsIcon sx={{ fontSize: 40 }} />;
      case 1:
        return <BassIcon sx={{ fontSize: 40 }} />;
      case 2:
        return <PianoGuitarIcon sx={{ fontSize: 40 }} />;
      case 3:
        return <OtherMelodicsIcon sx={{ fontSize: 40 }} />;
      case 4:
        return <VoiceIcon sx={{ fontSize: 40 }} />;
      default:
        return <MusicNoteIcon sx={{ fontSize: 40 }} />;
    }
  };

  const getLayerTexts = (index) => {
    switch (index) {
      case 0:
        return "תופים";
      case 1:
        return "בס";
      case 2:
        return "ליווי מוזיקלי";
      case 3:
        return "מלודיות";
      case 4:
        return "שירה";
      default:
        return "שכבה לא ידועה";
    }
  };

  const icon = <b>↓</b>;

  const rightStyle = {
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    overflow: "hidden",
    marginRight: "-5px",
    marginLeft: "5px",
  };

  const leftStyle = {
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    overflow: "hidden",
  };

  const myIndex =
    success.state || failed.state
      ? success.state
        ? success.index
        : failed.index
      : activeLayerIndex;

  return (
    <>
      <Box sx={{ minHeight: "100%" }}>
        <CardContent sx={{ paddingTop: "0" }}>
          <Typography
            variant="h6"
            component="div"
            textAlign="center"
            mb={2}
            fontSize={"1.2rem !important"}
          >
            לחץ על הקטע בשביל להוסיף שכבה נוספת {icon}
          </Typography>
          <Grid
            container
            // spacing={{ xs: 0.5, md: 2 }}
            style={{
              // padding: "12px 16px 12px 16px",
              // gap: "8px",
              borderRadius: "20px",
              overflow: "hidden",
              borderBottom: "2px #788393",
              marginBottom: "20px",
            }}
          >
            {activeLayers.map((layer, index) => (
              <Grid
                item
                xs={2.4}
                key={index}
                style={
                  myIndex === index
                    ? rightStyle
                    : myIndex + 1 === index
                    ? leftStyle
                    : null
                }
              >
                <Box
                  onClick={() => handleLayerClick(index)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "76px",
                    borderBottom: `2px solid ${
                      myIndex >= index ? "#8E0AB5" : "#788393"
                    }`,
                    // borderRadius: 1,
                    backgroundColor: getLayersColors(index).background,
                    // border: `3px solid ${getLayersColors(index).border}`,
                    cursor:
                      myIndex < index && !success.state && !failed.state
                        ? "pointer"
                        : "default",
                  }}
                >
                  <Box height={"37px"}>{getIcon(index)}</Box>
                  <Box color={"#fff"} fontSize={"12px"} fontWeight={"bold"}>
                    {getLayerTexts(index)}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          {(isShow || success.state || failed.state) && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Tooltip
                open={showTooltip}
                title={tooltipMessage}
                arrow
                placement="top"
                onClose={() => setShowTooltip(false)}
              >
                <Box onClick={() => handlePlayPause()}>
                  {isPlaying ? <PauseButton /> : <PlayButton />}
                </Box>
              </Tooltip>
            </Box>
          )}
          {activeLayer && isShow && (
            <AudioPlayer
              key={activeLayer.file}
              file={activeLayer.file}
              progress={progress}
              setProgress={setProgress}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          {(success.state || failed.state) && vocalsLayer && (
            <AudioPlayer
              key={"final"}
              file={vocalsLayer.file}
              progress={progress}
              setProgress={setProgress}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          {success.state && (
            <Result song={song} isSuccess={true} darkMode={darkMode} />
          )}
          {failed.state && (
            <Result song={song} isSuccess={false} darkMode={darkMode} />
          )}
          {isFirstPlay && showPlayer && (
            <GuessSkip
              show={isShow}
              onGuessSuccess={onGuessSuccess}
              onSkip={handleSkip}
              activeLayer={activeLayerIndex}
            />
          )}
        </CardContent>
      </Box>
      <CustomSnackbar
        alertOpen={layerClickAlert}
        handleCloseAlert={handleCloseAlert}
        message={skipMessage}
      />
    </>
  );
};

export default LayeredAudioPlayer;

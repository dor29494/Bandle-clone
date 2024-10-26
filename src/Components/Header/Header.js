import BarChartIcon from "@mui/icons-material/BarChart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShareIcon from "@mui/icons-material/Share";
import {
  Alert,
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { tooltipMessageState } from "../../state";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import HowToPlay from "../HowToPlay/HowToPlay";
import UserStats from "../UserStats/UserStats";
function Header({ setDarkMode, darkMode }) {
  const [tooltipMessage, setTooltipMessage] =
    useRecoilState(tooltipMessageState);
  const [modalsOpen, setModalsOpen] = useState({
    howToPlay: false,
    stats: false,
    settings: false,
  });
  const [alertOpen, setAlertOpen] = useState(false);

  const theme = useTheme();
  const [stats, setStats] = useState({
    found: 0,
    currentStreak: 0,
    maxStreak: 0,
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.removeItem("darkMode");
    }
  };

  useEffect(() => {
    const hasSeenHowToPlay = localStorage.getItem("hasSeenHowToPlay");
    if (!hasSeenHowToPlay) {
      setModalsOpen((prevState) => ({ ...prevState, howToPlay: true }));
      localStorage.setItem("hasSeenHowToPlay", "true");
    }
  }, []);

  const toggleModal = (modalName) => {
    setModalsOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
    if (modalName === "howToPlay") {
      setTooltipMessage("הגבר את השמע ולחץ על הפעל כדאי לנחש את השיר");
    }
  };

  const handleShareClick = () => {
    const message = `האם אתה יכול לזהות את השיר? ${window.location.href}`;
    if (navigator.share) {
      navigator
        .share({
          title: "נחשיר - זהה את השיר",
          text: message,
        })
        .then(() => {
          setAlertOpen(true);
        });
    } else {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setAlertOpen(true);
        })
        .catch((err) => console.error("Error copying text: ", err));
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.headerBg,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "150px", // Adjust this value as needed
              flexGrow: 1,
            }}
          >
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleDarkMode}
              color={theme.palette.primary.headerIcons}
            >
              {darkMode ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C12.6904 0 13.25 0.559644 13.25 1.25V3.75C13.25 4.44036 12.6904 5 12 5C11.3096 5 10.75 4.44036 10.75 3.75V1.25C10.75 0.559644 11.3096 0 12 0Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M13.25 20.25C13.25 19.5596 12.6904 19 12 19C11.3096 19 10.75 19.5596 10.75 20.25V22.75C10.75 23.4404 11.3096 24 12 24C12.6904 24 13.25 23.4404 13.25 22.75V20.25Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M0 12C0 11.3096 0.559644 10.75 1.25 10.75H3.75C4.44036 10.75 5 11.3096 5 12C5 12.6904 4.44036 13.25 3.75 13.25H1.25C0.559644 13.25 0 12.6904 0 12Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M3.52395 18.7083C3.0358 19.1965 3.0358 19.9879 3.52395 20.4761C4.01211 20.9642 4.80357 20.9642 5.29172 20.4761L6.99828 18.7695C7.48644 18.2814 7.48644 17.4899 6.99828 17.0017C6.51013 16.5136 5.71867 16.5136 5.23052 17.0017L3.52395 18.7083Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M3.52395 3.52393C3.0358 4.01208 3.0358 4.80354 3.52395 5.2917L5.23052 6.99826C5.71867 7.48641 6.51013 7.48641 6.99828 6.99826C7.48644 6.5101 7.48644 5.71865 6.99828 5.23049L5.29172 3.52393C4.80356 3.03577 4.01211 3.03577 3.52395 3.52393Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M20.476 18.7083C20.9642 19.1965 20.9642 19.9879 20.476 20.4761C19.9879 20.9642 19.1964 20.9642 18.7083 20.4761L17.0017 18.7695C16.5136 18.2814 16.5136 17.4899 17.0017 17.0017C17.4899 16.5136 18.2813 16.5136 18.7695 17.0017L20.476 18.7083Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M20.476 3.52393C20.9642 4.01208 20.9642 4.80354 20.476 5.29169L18.7695 6.99826C18.2813 7.48642 17.4899 7.48642 17.0017 6.99826C16.5136 6.51011 16.5136 5.71865 17.0017 5.2305L18.7083 3.52393C19.1964 3.03577 19.9879 3.03577 20.476 3.52393Z"
                    fill="#FEBA00"
                  />
                  <path
                    d="M20.25 10.75C19.5596 10.75 19 11.3096 19 12C19 12.6904 19.5596 13.25 20.25 13.25H22.75C23.4404 13.25 24 12.6904 24 12C24 11.3096 23.4404 10.75 22.75 10.75H20.25Z"
                    fill="#FEBA00"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.14129 3.56322C9.27244 3.04778 9.07095 2.55559 8.71196 2.26841C8.34505 1.97488 7.79829 1.88798 7.31672 2.18415C4.05447 4.19052 1.75 7.36255 1.75 11.5288C1.75 17.45 6.55006 22.25 12.4712 22.25C16.3821 22.25 20.0442 20.0452 21.8803 16.6467C22.17 16.1104 21.9989 15.5535 21.6728 15.2192C21.3592 14.8975 20.8577 14.7226 20.3492 14.8731C19.5911 15.0975 18.7725 15.2105 18.0108 15.2105C12.9181 15.2105 8.78957 11.082 8.78957 5.98923C8.78957 5.19522 8.9314 4.38812 9.14129 3.56322Z"
                    fill="#FEBA00"
                  />
                </svg>
              )}
            </IconButton>
            <IconButton
              edge="start"
              color={theme.palette.primary.headerIcons}
              aria-label="help"
              onClick={() => toggleModal("howToPlay")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={darkMode ? "#FFF" : "#282827"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.30833 5.59084C9.90349 5.04979 10.6789 4.75 11.4833 4.75H12.7322C13.5326 4.75 14.3002 5.06794 14.8661 5.63388L14.9117 5.67949C15.4485 6.21623 15.75 6.9442 15.75 7.70327C15.75 8.26147 15.5212 8.79528 15.117 9.18025L12.6767 11.5043C11.4464 12.6761 10.75 14.3009 10.75 16C10.75 16.6904 11.3096 17.25 12 17.25C12.6904 17.25 13.25 16.6904 13.25 16C13.25 14.9851 13.6659 14.0146 14.4009 13.3147L16.8411 10.9906C17.7408 10.1338 18.25 8.94566 18.25 7.70327C18.25 6.28116 17.6851 4.91731 16.6795 3.91173L16.6339 3.86612C15.5991 2.83133 14.1956 2.25 12.7322 2.25H11.4833C10.057 2.25 8.68198 2.7816 7.62665 3.74099C6.42775 4.8309 5.75 6.38966 5.75 8C5.75 8.69036 6.30964 9.25 7 9.25C7.69036 9.25 8.25 8.69036 8.25 8C8.25 7.08407 8.63794 6.20029 9.30833 5.59084Z"
                  fill="inherit"
                />
                <path
                  d="M12 18.75C11.0335 18.75 10.25 19.5335 10.25 20.5C10.25 21.4665 11.0335 22.25 12 22.25C12.9665 22.25 13.75 21.4665 13.75 20.5C13.75 19.5335 12.9665 18.75 12 18.75Z"
                  fill="inherit"
                />
              </svg>
            </IconButton>
          </Box>

          <Typography
            variant="h1"
            color={theme.palette.primary.headerIcons}
            sx={{ textAlign: "center", fontWeight: "bold", flexShrink: 0 }}
          >
            נחשיר
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "150px", // Adjust this value as needed
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color={theme.palette.primary.headerIcons}
              aria-label="share"
              onClick={handleShareClick}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <HowToPlay
        open={modalsOpen.howToPlay}
        onClose={() => toggleModal("howToPlay")}
      />
      <UserStats
        open={modalsOpen.stats}
        onClose={() => toggleModal("stats")}
        stats={stats}
      />
      {/* <SettingsModal open={modalsOpen.settings} onClose={() => toggleModal('settings')} darkMode={darkMode} setDarkMode={setDarkMode} /> */}
      <CustomSnackbar
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        message="הקישור הועתק!"
        success={true}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#ffffff",
            color: "#4caf50",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "5px",
            padding: "10px 20px",
            paddingLeft: "0",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          הקישור הועתק
        </Alert>
      </CustomSnackbar>
    </>
  );
}

export default Header;

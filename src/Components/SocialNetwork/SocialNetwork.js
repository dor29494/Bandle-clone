import { Share } from "@mui/icons-material";
import { Box, Link } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

function SocialNetwork({ youTubeId, spotifyId }) {
  const spotifyLink = useRef(process.env.REACT_APP_SPOTIFY_BASE + spotifyId);
  const youtubeLink = useRef(process.env.REACT_APP_YOUTUBE_BASE + youTubeId);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    spotifyLink.current = process.env.REACT_APP_SPOTIFY_BASE + spotifyId;
    youtubeLink.current = process.env.REACT_APP_YOUTUBE_BASE + youTubeId;
  }, [youTubeId, spotifyId]);

  const handleShare = () => {
    const message = `האם אתה יכול לזהות את השיר? ${window.location.href}`;

    if (navigator.share) {
      navigator
        .share({
          title: "שירדל - זהה את השיר",
          text: message,
        })
        .then(() => {
          setAlertMessage("הקישור הועתק");
          setAlertOpen(true);
        });
    } else {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setAlertMessage("הקישור הועתק");
          setAlertOpen(true);
        })
        .catch(() => {
          setAlertMessage("שגיאה בהעתקת הקישור.");
          setAlertOpen(true);
        });
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Box
        display={"inline-flex"}
        component={Link}
        target="_blank"
        href={spotifyLink.current ? spotifyLink.current.toString() : ""}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7_3329)">
            <path
              d="M12 0C5.37273 0 0 5.37218 0 12C0 18.6278 5.37273 24 12 24C18.6273 24 24 18.6278 24 12C24 5.37218 18.6273 0 12 0ZM17.8545 17.2987C17.6618 17.64 17.3073 17.832 16.9418 17.832C16.7709 17.832 16.5945 17.7893 16.4327 17.6993C14.9345 16.8593 13.3018 16.3447 11.5764 16.17C9.84728 15.9967 8.14 16.1722 6.5 16.6958C5.95273 16.8705 5.36364 16.5682 5.1891 16.02C5.01273 15.4709 5.31637 14.8838 5.86546 14.7082C7.77818 14.0971 9.77272 13.8893 11.7873 14.094C13.7982 14.2987 15.7036 14.8987 17.4527 15.8791C17.9564 16.1595 18.1364 16.7955 17.8545 17.2987ZM19.2909 13.6538C19.1055 14.0107 18.7418 14.2155 18.3655 14.2155C18.2018 14.2155 18.0382 14.178 17.8836 14.0971C16.0418 13.1378 14.0527 12.5438 11.9673 12.3322C9.86545 12.1171 7.78364 12.3045 5.77637 12.8835C5.22182 13.0409 4.64364 12.7238 4.48546 12.1695C4.32546 11.616 4.64545 11.0378 5.19818 10.878C7.46363 10.2247 9.81272 10.0155 12.1782 10.2555C14.5273 10.4947 16.7709 11.1638 18.8491 12.2467C19.3582 12.5131 19.5582 13.1429 19.2909 13.6538ZM19.8109 10.6215C19.6545 10.6215 19.4964 10.5862 19.3455 10.512C17.16 9.42218 14.8091 8.74345 12.3564 8.49455C9.89999 8.24327 7.45636 8.43746 5.09091 9.06909C4.53455 9.21673 3.96363 8.88673 3.81454 8.32945C3.66545 7.77291 3.99637 7.20073 4.55455 7.05218C7.16365 6.35546 9.86182 6.14327 12.5691 6.41855C15.2727 6.69218 17.8655 7.44145 20.2764 8.64382C20.7927 8.90091 21.0018 9.528 20.7455 10.0433C20.5636 10.41 20.1945 10.6215 19.8109 10.6215Z"
              fill="#1ED760"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_3329">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
      <Box
        display={"inline-flex"}
        component={Link}
        target="_blank"
        href={spotifyLink.current ? spotifyLink.current.toString() : ""}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7_3331)">
            <path
              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
              fill="#FF0000"
            />
            <path
              d="M12 6.52693C15.0183 6.52693 17.473 8.98171 17.473 12C17.473 15.0182 15.0183 17.473 12 17.473C8.98174 17.473 6.52696 15.0182 6.52696 12C6.52696 8.98171 8.98174 6.52693 12 6.52693ZM12 5.99997C8.68565 5.99997 6 8.68562 6 12C6 15.3143 8.68565 18 12 18C15.3143 18 18 15.3143 18 12C18 8.68562 15.3143 5.99997 12 5.99997Z"
              fill="white"
            />
            <path
              d="M10.2656 15.4218L15.4219 11.8512L10.2656 8.57809V15.4218Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_3331">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
      <Box
        display={"inline-flex"}
        onClick={handleShare}
        style={{ cursor: "pointer" }}
      >
        <Share fontSize="medium" />
      </Box>
      <CustomSnackbar
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        message={alertMessage}
      />
    </>
  );
}

export default SocialNetwork;

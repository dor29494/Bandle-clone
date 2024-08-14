import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import Timer from "../Timer/Timer";

const darkColor = "#fff";
const lightColor = "#282827";

const Result = ({ isSuccess, song, isDaily }) => {
  useEffect(() => {
    if (!isDaily) return;

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
    localStorage.setItem("lastResult", isSuccess ? "true" : "false");
  }, []);

  const darkMode = localStorage.getItem("darkMode") === "true";

  return (
    <Box
      display="flex"
      margin="auto"
      gap={2}
      mt={4}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={"12px 20px"}
      borderRadius={"20px"}
      border={`1px solid #C2C7D1`}
      backgroundColor={darkMode ? "#000" : "#fff"}
      width="100%"
      maxWidth="480px"
      position="relative"
    >
      <Box textAlign={"center"}>
        <Box>{isSuccess && <Box>ניחוש נכון!</Box>}</Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"4px"}
        >
          <Box display={"inline-flex"}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill={darkMode ? darkColor : lightColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 20.25C11.3096 20.25 10.75 19.6904 10.75 19L10.75 6C10.75 5.30964 11.3096 4.75 12 4.75C12.6904 4.75 13.25 5.30964 13.25 6L13.25 19C13.25 19.6904 12.6904 20.25 12 20.25Z"
                fill="inherit"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 16.75C19.3096 16.75 18.75 16.1904 18.75 15.5V9.5C18.75 8.80964 19.3096 8.25 20 8.25C20.6904 8.25 21.25 8.80964 21.25 9.5V15.5C21.25 16.1904 20.6904 16.75 20 16.75Z"
                fill="inherit"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 23.75C15.3096 23.75 14.75 23.1904 14.75 22.5L14.75 2.5C14.75 1.80964 15.3096 1.25 16 1.25C16.6904 1.25 17.25 1.80964 17.25 2.5L17.25 22.5C17.25 23.1904 16.6904 23.75 16 23.75Z"
                fill="inherit"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 20.25C3.30964 20.25 2.75 19.6904 2.75 19L2.75 6C2.75 5.30964 3.30964 4.75 4 4.75C4.69036 4.75 5.25 5.30964 5.25 6L5.25 19C5.25 19.6904 4.69036 20.25 4 20.25Z"
                fill="inherit"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16.75C7.30964 16.75 6.75 16.1904 6.75 15.5V9.5C6.75 8.80964 7.30964 8.25 8 8.25C8.69036 8.25 9.25 8.80964 9.25 9.5V15.5C9.25 16.1904 8.69036 16.75 8 16.75Z"
                fill="inherit"
              />
            </svg>
          </Box>
          <Box fontSize={"20px"} fontWeight={"bold"}>
            {song.title}
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={!isDaily ? "center" : "space-between"}
        alignItems={"flex-start"}
        alignSelf={"stretch"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"8px"}
        >
          <Box fontSize={"12px"} fontWeight={"bold"}>
            קישורים:
          </Box>
          <Box display={"flex"} alignItems={"flex-start"} gap={"20px"}>
            <SocialNetwork
              spotifyId={song.spotifyId}
              youTubeId={song.youtubeId}
            />
          </Box>
        </Box>
        {isDaily && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"8px"}
          >
            <Box fontSize={"12px"} fontWeight={"bold"}>
              שיר הבא בעוד:
            </Box>
            <Box>
              <Timer />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Result;

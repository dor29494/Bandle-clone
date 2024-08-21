import { Box } from "@mui/material";
import React from "react";

const CloseHeader = ({ handleClick, nextSongClick = null }) => {
  const darkMode = localStorage.getItem("darkMode") === "true";

  return (
    <Box
      display={"flex"}
      justifyContent={nextSongClick ? "space-between" : "flex-end"}
      alignContent={"center"}
      alignItems={"center"}
    >
      {nextSongClick && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
          gap="8px"
          onClick={nextSongClick}
          sx={{ cursor: "pointer" }}
        >
          <Box display={"inline-flex"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={darkMode ? "#BABACF" : "#585B93"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.96883 5.60984C3.47155 4.64493 1.5 5.71986 1.5 7.50112V16.4988C1.5 18.2801 3.47155 19.355 4.96883 18.3901L11.75 14.02V16.4988C11.75 18.2801 13.7216 19.355 15.2188 18.3901L22.1998 13.8912C23.5747 13.0052 23.5747 10.9947 22.1998 10.1087L15.2188 5.60984C13.7216 4.64493 11.75 5.71986 11.75 7.50112V9.97993L4.96883 5.60984Z"
                fill="inherit"
              />
            </svg>
          </Box>
          <Box
            fontSize={"15px"}
            color={darkMode ? "#BABACF" : "#585B93"}
            fontWeight={"bold"}
          >
            נגן שיר הבא
          </Box>
        </Box>
      )}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        paddingLeft="20px"
        alignItems={"center"}
        gap="8px"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <Box
          fontSize={"15px"}
          color={darkMode ? "#BABACF" : "#585B93"}
          fontWeight={"bold"}
        >
          חזור
        </Box>
        <Box display={"inline-flex"}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={darkMode ? "#BABACF" : "#585B93"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 5.7503C11.5 4.43622 9.91124 3.77811 8.98204 4.70731L3.28035 10.409C2.40167 11.2877 2.40167 12.7123 3.28035 13.591L8.98204 19.2927C9.91124 20.2219 11.5 19.5638 11.5 18.2497V13.25L20.5 13.25C21.1904 13.25 21.75 12.6903 21.75 12C21.75 11.3096 21.1904 10.75 20.5 10.75L11.5 10.75V5.7503Z"
              fill="inherit"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default CloseHeader;

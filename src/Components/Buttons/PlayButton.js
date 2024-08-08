import { Box } from "@mui/material";
import React from "react";

const PlayButton = ({ isAnimate }) => {
  return (
    <Box
      display={"flex"}
      width={"122px"}
      height={"48px"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
      gap={"5px"}
      borderRadius={"60px"}
      padding={"12px 24px"}
      border={"0px 0px 2px 0px"}
      flexDirection={"row"}
      backgroundColor={"#1EDB19"}
      style={{ cursor: "pointer" }}
      className={isAnimate ? "zoom-in-out-box" : ""}
    >
      <Box display={"inline-flex"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.35145 4.60032C7.85161 3.75832 6 4.84227 6 6.56229V17.4376C6 19.1577 7.85162 20.2416 9.35146 19.3996L19.0373 13.9619C20.5687 13.1021 20.5687 10.8977 19.0373 10.038L9.35145 4.60032Z"
            fill="white"
          />
        </svg>
      </Box>
      <Box color={"#fff"} fontSize={"20px"} fontWeight={"bold"}>
        נגן
      </Box>
    </Box>
  );
};

export default PlayButton;

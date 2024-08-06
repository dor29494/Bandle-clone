import { Box } from "@mui/material";
import React from "react";

const PauseButton = () => {
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
      backgroundColor={"#FEBA00"}
      style={{ cursor: "pointer" }}
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
            d="M6.5 4.75C5.25736 4.75 4.25 5.75736 4.25 7V17C4.25 18.2426 5.25736 19.25 6.5 19.25H8C9.24264 19.25 10.25 18.2426 10.25 17V7C10.25 5.75736 9.24264 4.75 8 4.75H6.5Z"
            fill="white"
          />
          <path
            d="M15 4.75C13.7574 4.75 12.75 5.75736 12.75 7V17C12.75 18.2426 13.7574 19.25 15 19.25H16.5C17.7426 19.25 18.75 18.2426 18.75 17V7C18.75 5.75736 17.7426 4.75 16.5 4.75H15Z"
            fill="white"
          />
        </svg>
      </Box>
      <Box color={"#fff"} fontSize={"20px"} fontWeight={"bold"}>
        השהה
      </Box>
    </Box>
  );
};

export default PauseButton;

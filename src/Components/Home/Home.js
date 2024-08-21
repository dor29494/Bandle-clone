import React from "react";
import { Box, Button } from "@mui/material";
import HomePageSvg from "./HomePageSvg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={"12px"}
      height="calc(90vh - 64px)"
    >
      <Box>
        <HomePageSvg />
      </Box>
      <Button
        component={Link}
        to="/daily"
        variant="contained"
        sx={{
          borderBottom: "2px solid #0450CC",
          background: "#3894F4",
          height: "48px",
          gap: "8px",
          padding: "12px 24px",
          borderRadius: "60px",
          width: "100%",
          maxWidth: "335px",
          ":hover": {
            background: "#0450CC",
            borderBottom: "2px solid #3894F4",
          },
        }}
      >
        <Box display={"inline-flex"}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25 17.4999L8.25 5.36126C8.25 5.25123 8.32194 5.15413 8.42721 5.12209L16.9272 2.53514C17.0878 2.48626 17.25 2.60642 17.25 2.7743V11.9377C16.8516 11.8152 16.4289 11.7498 16 11.7498C14.0628 11.7498 12.25 13.0827 12.25 14.9998C12.25 16.917 14.0628 18.2499 16 18.2499C17.9372 18.2499 19.75 16.917 19.75 14.9999V2.7743C19.75 0.927605 17.966 -0.394237 16.1993 0.143451L7.69931 2.73041C6.54138 3.08282 5.75 4.15089 5.75 5.36126L5.75 14.4377C5.35165 14.3152 4.92887 14.2498 4.5 14.2498C2.56278 14.2498 0.75 15.5827 0.75 17.4999C0.75 19.417 2.56278 20.7499 4.5 20.7499C6.43722 20.7499 8.25 19.417 8.25 17.4999Z"
              fill="white"
            />
          </svg>
        </Box>
        <Box fontSize="16px" color={"#fff"} fontWeight={"bold"}>
          ניחוש יומי
        </Box>
      </Button>
      <Button
        component={Link}
        to="/categories"
        variant="contained"
        sx={{
          borderBottom: "2px solid #0096A0",
          background: "#11C8CA",
          height: "48px",
          gap: "8px",
          padding: "12px 24px",
          borderRadius: "60px",
          width: "100%",
          maxWidth: "335px",
          ":hover": {
            background: "#0096A0",
            borderBottom: "2px solid #11C8CA",
          },
        }}
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
              d="M12.193 1.81669C11.743 0.436758 9.79085 0.436753 9.34085 1.81668L7.68751 6.88665C7.56375 7.26617 7.26617 7.56375 6.88665 7.68751L1.81669 9.34085C0.436758 9.79085 0.436753 11.743 1.81669 12.193L6.88761 13.8467C7.26668 13.9703 7.56404 14.2673 7.68806 14.6463L9.34134 19.6978C9.79231 21.0757 11.7416 21.0757 12.1925 19.6978L13.8461 14.6453C13.97 14.2668 14.2668 13.97 14.6453 13.8461L19.6978 12.1925C21.0757 11.7416 21.0757 9.79231 19.6978 9.34134L14.6463 7.68806C14.2673 7.56404 13.9703 7.26668 13.8467 6.88761L12.193 1.81669Z"
              fill="white"
            />
            <path
              d="M20.2248 16.2535C20.0273 15.5104 18.9727 15.5104 18.7751 16.2535L18.4318 17.5449C18.3167 17.9782 17.9782 18.3166 17.5449 18.4318L16.2536 18.7751C15.5105 18.9726 15.5105 20.0272 16.2536 20.2247L17.5449 20.568C17.9782 20.6832 18.3167 21.0216 18.4318 21.4549L18.7751 22.7463C18.9727 23.4894 20.0273 23.4894 20.2248 22.7463L20.5681 21.4549C20.6832 21.0216 21.0217 20.6832 21.455 20.568L22.7464 20.2247C23.4895 20.0272 23.4894 18.9726 22.7463 18.7751L21.455 18.4318C21.0217 18.3166 20.6832 17.9782 20.5681 17.5449L20.2248 16.2535Z"
              fill="white"
            />
          </svg>
        </Box>
        <Box fontSize="16px" color={"#fff"} fontWeight={"bold"}>
          קטגוריות
        </Box>
      </Button>
    </Box>
  );
};

export default Home;

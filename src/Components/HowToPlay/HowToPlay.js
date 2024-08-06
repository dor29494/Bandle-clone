import { Box, Button, Dialog, DialogContent, useTheme } from "@mui/material";
import React from "react";

function HowToPlay({ open, onClose }) {
  const theme = useTheme();

  const darkMode = localStorage.getItem("darkMode") === "true";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers sx={{ zIndex: "55" }}>
        <Box
          display={"flex"}
          padding={"0 16px"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"24px"}
          borderRadius={"20px"}
          borderBottom={"2px #C2C7D1"}
        >
          <Box
            color={darkMode ? "#fff" : "#000000de"}
            fontSize={"16px"}
            fontWeight={"600"}
          >
            איך לשחק:
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"12px"}
            alignSelf={"stretch"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
              alignSelf={"stretch"}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "#fff" : "#282827"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.041 2.22686C12.7706 1.52594 11.2294 1.52594 9.95903 2.22686L3.13925 5.98949C1.95033 6.64545 1.95033 8.35428 3.13925 9.01023L9.95903 12.7729C11.2294 13.4738 12.7706 13.4738 14.041 12.7729L20.8608 9.01023C22.0497 8.35427 22.0497 6.64545 20.8608 5.98949L14.041 2.22686Z"
                    fill="inhert"
                  />
                  <path
                    d="M21.094 13.5465C21.6857 13.2184 21.8995 12.4728 21.5714 11.8811C21.2434 11.2894 20.4978 11.0757 19.9061 11.4037L12.8607 15.3096C12.3253 15.6064 11.6748 15.6064 11.1394 15.3096L4.094 11.4038C3.5023 11.0757 2.75671 11.2895 2.42868 11.8812C2.10065 12.4729 2.3144 13.2185 2.90611 13.5465L9.95154 17.4524C11.2259 18.1588 12.7743 18.1588 14.0486 17.4524L21.094 13.5465Z"
                    fill="inhert"
                  />
                  <path
                    d="M21.0695 18.3097C21.6685 17.9952 21.8992 17.2547 21.5847 16.6557C21.2702 16.0566 20.5297 15.826 19.9307 16.1404L12.8251 19.8707C12.3085 20.1419 11.6916 20.1419 11.175 19.8707L4.06946 16.1405C3.47043 15.826 2.7299 16.0567 2.41543 16.6557C2.10096 17.2547 2.33164 17.9953 2.93066 18.3097L10.0362 22.04C11.2659 22.6855 12.7343 22.6855 13.9639 22.0399L21.0695 18.3097Z"
                    fill="inhert"
                  />
                </svg>
              </Box>
              <Box color={"282827"} fontSize={"14px"} fontWeight={"600"}>
                כל שיר מחולק לשכבות
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
              alignSelf={"stretch"}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "#fff" : "#282827"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.51373 3.25H3.5C1.98122 3.25 0.75 4.48122 0.75 6V7.48142C0.75 8.99069 1.46726 10.4101 2.6823 11.3054L5.73777 13.5568C6.40044 15.665 8.37623 17.2299 10.75 17.6425V20.75H8C7.30964 20.75 6.75 21.3096 6.75 22C6.75 22.6904 7.30964 23.25 8 23.25H16C16.6904 23.25 17.25 22.6904 17.25 22C17.25 21.3096 16.6904 20.75 16 20.75H13.25V17.6425C15.6238 17.2299 17.5996 15.665 18.2622 13.5568L21.3177 11.3054C22.5327 10.4101 23.25 8.99069 23.25 7.48142V6C23.25 4.48122 22.0188 3.25 20.5 3.25H18.4863C18.3619 2.12501 17.4081 1.25 16.25 1.25H7.75C6.59186 1.25 5.63809 2.12501 5.51373 3.25ZM5.5 5.75V10.2763L4.1653 9.2928C3.58975 8.86871 3.25 8.19634 3.25 7.48142V6C3.25 5.86193 3.36193 5.75 3.5 5.75H5.5ZM18.5 10.2763V5.75H20.5C20.6381 5.75 20.75 5.86193 20.75 6V7.48142C20.75 8.19634 20.4102 8.86871 19.8347 9.2928L18.5 10.2763Z"
                    fill="inherit"
                  />
                </svg>
              </Box>
              <Box color={"282827"} fontSize={"14px"} fontWeight={"600"}>
                נחשו את השיר בכמה שפחות צעדים
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
              alignSelf={"stretch"}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "#fff" : "#282827"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 20.5C10.75 21.1904 11.3096 21.75 12 21.75C12.6904 21.75 13.25 21.1904 13.25 20.5V13.25H20.5C21.1904 13.25 21.75 12.6904 21.75 12C21.75 11.3096 21.1904 10.75 20.5 10.75H13.25V3.5C13.25 2.80964 12.6904 2.25 12 2.25C11.3096 2.25 10.75 2.80964 10.75 3.5V10.75H3.5C2.80964 10.75 2.25 11.3096 2.25 12C2.25 12.6904 2.80964 13.25 3.5 13.25H10.75V20.5Z"
                    fill="inherit"
                  />
                </svg>
              </Box>
              <Box color={"282827"} fontSize={"14px"} fontWeight={"600"}>
                כדי להוסיף מכשיר, לחץ על המכשירים הלא פעילים
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
              alignSelf={"stretch"}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "#fff" : "#282827"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.193 1.81669C11.743 0.436758 9.79085 0.436753 9.34085 1.81668L7.68751 6.88665C7.56375 7.26617 7.26617 7.56375 6.88665 7.68751L1.81669 9.34085C0.436758 9.79085 0.436753 11.743 1.81669 12.193L6.88761 13.8467C7.26668 13.9703 7.56404 14.2673 7.68806 14.6463L9.34134 19.6978C9.79231 21.0757 11.7416 21.0757 12.1925 19.6978L13.8461 14.6453C13.97 14.2668 14.2668 13.97 14.6453 13.8461L19.6978 12.1925C21.0757 11.7416 21.0757 9.79231 19.6978 9.34134L14.6463 7.68806C14.2673 7.56404 13.9703 7.26668 13.8467 6.88761L12.193 1.81669Z"
                    fill="inherit"
                  />
                  <path
                    d="M20.2248 16.2535C20.0273 15.5104 18.9727 15.5104 18.7751 16.2535L18.4318 17.5449C18.3167 17.9782 17.9782 18.3166 17.5449 18.4318L16.2536 18.7751C15.5105 18.9726 15.5105 20.0272 16.2536 20.2247L17.5449 20.568C17.9782 20.6832 18.3167 21.0216 18.4318 21.4549L18.7751 22.7463C18.9727 23.4894 20.0273 23.4894 20.2248 22.7463L20.5681 21.4549C20.6832 21.0216 21.0217 20.6832 21.455 20.568L22.7464 20.2247C23.4895 20.0272 23.4894 18.9726 22.7463 18.7751L21.455 18.4318C21.0217 18.3166 20.6832 17.9782 20.5681 17.5449L20.2248 16.2535Z"
                    fill="inherit"
                  />
                </svg>
              </Box>
              <Box color={"282827"} fontSize={"14px"} fontWeight={"600"}>
                הקלד את הכותרת/האמנים ולחץ על נחש
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
              alignSelf={"stretch"}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "#fff" : "#282827"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.96883 5.60984C3.47155 4.64493 1.5 5.71986 1.5 7.50112V16.4988C1.5 18.2801 3.47155 19.355 4.96883 18.3901L11.75 14.02V16.4988C11.75 18.2801 13.7216 19.355 15.2188 18.3901L22.1998 13.8912C23.5747 13.0052 23.5747 10.9947 22.1998 10.1087L15.2188 5.60984C13.7216 4.64493 11.75 5.71986 11.75 7.50112V9.97993L4.96883 5.60984Z"
                    fill="inherit"
                  />
                </svg>
              </Box>
              <Box color={"282827"} fontSize={"14px"} fontWeight={"600"}>
                לחץ על דלג אם אינך מזהה את השכבה
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={3} display={"flex"} justifyContent={"center"}>
          <Box>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                display: "flex",
                padding: "12px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "60px",
                borderBottom: "2px solid #0AAA43",
                backgroundColor: "#1EDB19",
                width: "250px",
                ":hover": {
                  backgroundColor: "#0AAA43",
                },
              }}
            >
              <Box display={"inline-flex"}>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 19.75C11.8096 19.75 11.25 19.1904 11.25 18.5L11.25 5.5C11.25 4.80964 11.8096 4.25 12.5 4.25C13.1904 4.25 13.75 4.80964 13.75 5.5L13.75 18.5C13.75 19.1904 13.1904 19.75 12.5 19.75Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 16.25C19.8096 16.25 19.25 15.6904 19.25 15V9C19.25 8.30964 19.8096 7.75 20.5 7.75C21.1904 7.75 21.75 8.30964 21.75 9V15C21.75 15.6904 21.1904 16.25 20.5 16.25Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5 23.25C15.8096 23.25 15.25 22.6904 15.25 22L15.25 2C15.25 1.30964 15.8096 0.75 16.5 0.75C17.1904 0.75 17.75 1.30964 17.75 2L17.75 22C17.75 22.6904 17.1904 23.25 16.5 23.25Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 19.75C3.80964 19.75 3.25 19.1904 3.25 18.5L3.25 5.5C3.25 4.80964 3.80964 4.25 4.5 4.25C5.19036 4.25 5.75 4.80964 5.75 5.5L5.75 18.5C5.75 19.1904 5.19036 19.75 4.5 19.75Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.5 16.25C7.80964 16.25 7.25 15.6904 7.25 15V9C7.25 8.30964 7.80964 7.75 8.5 7.75C9.19036 7.75 9.75 8.30964 9.75 9V15C9.75 15.6904 9.19036 16.25 8.5 16.25Z"
                    fill="white"
                  />
                </svg>
              </Box>
              <Box fontSize={"16px"} fontWeight={"bold"} color={"#fff"}>
                התחל לשחק
              </Box>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default HowToPlay;

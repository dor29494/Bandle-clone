import { Box, Button, Dialog, DialogContent, useTheme } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import BugReportIcon from "@mui/icons-material/BugReport";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandshakeIcon from '@mui/icons-material/Handshake';

function BetaGuide({ open, onClose }) {
  const theme = useTheme();
  const darkMode = localStorage.getItem("darkMode") === "true";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
        },
      }}
    >
      <DialogContent dividers sx={{ zIndex: "55", }}>
        <Box
          sx={{maxWidth: {lg: "75%"}, margin: {lg: "auto"}}}
          display={"flex"}
          padding={"0 16px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"16px"}
          borderRadius={"20px"}
          borderBottom={"2px #C2C7D1"}
        >
          {/* כותרת עם אייקון כוכב */}
          <Box
            display={"flex"}
            alignItems={"center"}
            color={darkMode ? "#fff" : "#000000de"}
            fontSize={"18px"}
            fontWeight={"700"}
            gap={"8px"}
          >
            <StarIcon sx={{ color: darkMode ? "#BABACF" : "#585B93" }} />
            ברוכים הבאים לגרסת הבטא של נחשיר!
          </Box>

          {/* תיאור עם אייקונים */}
          <Box
            sx={{gap: {sm: "12px", md: "12px", lg: "24px"}}}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            alignSelf={"stretch"}
            color={darkMode ? "#fff" : "#282827"}
            fontSize={"14px"}
            lineHeight={"1.6"}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <HandshakeIcon sx={{ color: darkMode ? "#BABACF" : "#585B93", marginLeft: {xs: "6px" , md: "6px", lg: "0px"} }} />
              כאן אנחנו מתחילים את המסע המשותף שלנו, וכמוך, אנחנו מתרגשים לשמוע את דעתך. נחשיר עדיין בשלבי פיתוח, ואנחנו עובדים קשה לשפר ולשדרג את החוויה עבורך.
            </Box>

            <Box display="flex" alignItems="center" gap="8px">
              <BugReportIcon sx={{ color: darkMode ? "#BABACF" : "#585B93",marginLeft: {xs: "6px" , md: "6px", lg: "0px"} }} />
              בזמן השימוש ייתכן שתיתקל בבאגים או תקלות קטנות – זה טבעי בגרסת בטא, ובזכותך נוכל למצוא ולפתור אותם במהירות. תודה על הסבלנות, התמיכה והמשוב שלך!
            </Box>

            <Box display="flex" alignItems="center" gap="8px">
              <FavoriteIcon sx={{ color: darkMode ? "#BABACF" : "#585B93", marginLeft: {xs: "6px" , md: "6px", lg: "0px"} }} />
              מוזמן לשחק, ליהנות ולעזור לנו להפוך את נחשיר לטובה ביותר!
            </Box>
          </Box>
        </Box>

        {/* כפתור אישור */}
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
                marginTop: "5px"
              }}
            >
              <Box fontSize={"16px"} fontWeight={"bold"} color={"#fff"}>
                הסבר על המשחק
              </Box>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default BetaGuide;

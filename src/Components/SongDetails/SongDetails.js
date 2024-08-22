import { useTheme } from "@emotion/react";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const SongDetails = ({ releaseDate, views, difficulty }) => {
  const theme = useTheme();
  return (
    <Box sx={{ margin: "auto", padding: "0 16px" }}>
      <Typography
        variant="h6"
        textAlign="center"
        mb={1}
        fontWeight={"bold"}
        fontSize={"1rem !important"}
      >
        פרטי השיר:
      </Typography>
      <Paper
        elevation={3}
        sx={{
          boxShadow: `0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px ${theme.palette.primary.songDetailsBoxShadow};`,
          padding: "8px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: "1px solid #C2C7D1",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" color="textSecondary">
            שוחרר בשנת
          </Typography>
          <Typography variant="h6">{releaseDate}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" color="textSecondary">
            צפיות ביוטיוב
          </Typography>
          <Typography variant="h6">{views}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" color="textSecondary">
            קושי
          </Typography>
          <Typography variant="h6">{difficulty}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SongDetails;

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

function UserStats({ open, onClose }) {
  const [stats, setStats] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (open) {
      const storedStats = JSON.parse(localStorage.getItem("userStats")) || {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
      setStats(storedStats);
    }
  }, [open]);

  const totalGuesses = Object.values(stats).reduce((a, b) => a + b, 0);

  const getProgressBarColor = (value) => {
    return value > 0 ? "#3f51b5" : "lightgrey";
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        סטטיסטיקות
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box mt={2}>
          <Grid container spacing={2}>
            {Object.keys(stats).map((key) => (
              <Grid
                item
                xs={12}
                key={key}
                sx={{ paddingLeft: "0 !important", paddingTop: "0 !important" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    py: 1,
                    paddingTop: "1px !important",
                    paddingBottom: "1px !important",
                  }}
                >
                  <Typography variant="body1" sx={{ width: "30px" }}>
                    {key === "6" ? "X" : key}
                  </Typography>
                  <Box
                    sx={{ width: "100%", mr: 1, ml: 1, position: "relative" }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={(stats[key] / totalGuesses) * 100}
                      sx={{
                        height: 15,
                        borderRadius: 5,
                        backgroundColor: "lightgrey",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getProgressBarColor(stats[key]),
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        textAlign: "center",
                        color:
                          (stats[key] / totalGuesses) * 100 > 50
                            ? "#FFFFFF"
                            : "#000000",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {totalGuesses > 0
                          ? ((stats[key] / totalGuesses) * 100).toFixed(2) + "%"
                          : "0%"}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ width: "30px", fontSize: "14px" }}
                  >
                    {`(${stats[key]})`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <CustomSnackbar
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        message={alertMessage}
      />
    </Dialog>
  );
}

export default UserStats;

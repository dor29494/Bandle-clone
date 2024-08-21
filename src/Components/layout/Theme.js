// src/Components/layout/Theme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      headerBg: "#FFFFFF",
      headerIcons: "#000000",
      successBg: "#f5f5f5",
      progressSliderBG: "#1976d2",
      snackBarBG: "#fff",
      songDetailsBoxShadow: "#0000001F",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "60px",
          backgroundColor: "#000",
        },
        arrow: {
          color: "#000",
        },
      },
    },
  },
  typography: {
    fontFamily: "Geist,sans-serif,Roboto,Helvetica,Arial",
    h1: {
      fontSize: "22px",
      fontWeight: 500,
      margin: 0,
      padding: 0,
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "20px",
      "@media (max-width:600px)": {
        fontSize: "16px",
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: "14px",
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
  },
  icons: {
    large: "40px",
    medium: "30px",
  },
});

const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
      headerBg: "#000",
      headerIcons: "#E0E0E0",
      successBg: "#2B2929",
      progressSliderBG: "#1976d2",
      snackBarBG: "#D3D3D3",
      songDetailsBoxShadow: "#666060",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "60px",
          backgroundColor: "#fff",
          color: "#000",
        },
        arrow: {
          color: "#fff",
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "22px",
      fontWeight: 500,
      margin: 0,
      padding: 0,
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "20px",
      "@media (max-width:600px)": {
        fontSize: "16px",
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: "14px",
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
  },
  icons: {
    large: "40px",
    medium: "30px",
  },
});

export { darkTheme, lightTheme };

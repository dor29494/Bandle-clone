import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import DailyGame from "./Components/DailyGame/DailyGame";
import Categories from "./Components/Categories/Categories";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

const App = ({ setDarkMode, darkMode }) => {
  return (
    <Router>
      <Box maxWidth="480px" margin="auto" minHeight="100%">
        <Header setDarkMode={setDarkMode} darkMode={darkMode} />
        {/* <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Daily Game
          </Button>
          <Button variant="contained" component={Link} to="/categories">
            Categories
          </Button>
        </Box> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/daily"
            element={
              <DailyGame darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;

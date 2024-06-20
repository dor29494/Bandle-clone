import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import Header from "../Header/Header";

const Loader = () => {
    return (
        <Box maxWidth="480px" margin="auto" minHeight='100%'>
            {/* <Header setDarkMode={setDarkMode} darkMode={darkMode} /> */}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ height: '100vh', alignItems: 'center' }}
            >
                <Grid item sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Loader;



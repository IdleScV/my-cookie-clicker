import React from "react";
import CookieClicker from "./components/CookieClicker"; // Adjust the import path according to your file structure
import { Box } from "rebass";
import "./styles/fonts.css";
import "./styles/animations.css";
import "./App.css";
const App = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "95vh",
            }}
        >
            <CookieClicker />
        </Box>
    );
};

export default App;

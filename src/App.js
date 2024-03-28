import React from "react";
import CookieClicker from "./components/CookieClicker";
import { Box } from "rebass";
import "./styles/fonts.css";
import "./styles/animations.css";
import "./App.css";
const App = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // remove padding if screen is too small
                pt: [0, 2, 4],
            }}
        >
            <CookieClicker />
        </Box>
    );
};

export default App;

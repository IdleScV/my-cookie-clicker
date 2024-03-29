import React from "react";
import CookieClicker from "./components/CookieClicker";
import { Box } from "rebass";
import { Analytics } from "@vercel/analytics/react";
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
            <Analytics />
        </Box>
    );
};

export default App;

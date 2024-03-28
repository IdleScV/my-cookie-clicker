// CookieCounter.js
import React from "react";
import { animated } from "react-spring";
import formatNumber from "../utility/formatNumber";
import { Box } from "rebass";

const CookieCounter = ({ props }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                textAlign: "center",

                width: "100%",
            }}
        >
            <animated.div
                style={{
                    marginTop: 20,
                    fontSize: 72,
                    fontFamily: "Silkscreen, Arial, sans-serif",
                    maxWidth: "300px",
                    overflow: "hidden",
                }}
            >
                {props.number.to((n) => formatNumber(Math.round(n * 10) / 10))}
            </animated.div>
        </Box>
    );
};

export default CookieCounter;

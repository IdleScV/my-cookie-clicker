import React from "react";
import { animated } from "react-spring";
import formatNumber from "../utility/formatNumber";
import { Box, Text } from "rebass"; // Assuming Text is also imported from 'rebass'

// Adjust the props to include totalCps for clarity
const CookieCounter = ({ props, cookiesPerSecond }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
            }}
        >
            <animated.div
                style={{
                    fontSize: 72,
                    fontFamily: "Silkscreen, Arial, sans-serif",
                }}
            >
                {/* Assuming number is the animated value for total cookies */}
                {props.number.to((n) => formatNumber(Math.round(n)))}
            </animated.div>
            {/* Display total CPS */}
            <Text
                sx={{
                    fontSize: 24, // Adjust font size as needed
                    fontFamily: "Silkscreen, Arial, sans-serif",
                    marginTop: 2, // Adjust spacing as needed
                }}
            >
                {`Total CPS: ${formatNumber(cookiesPerSecond)}`}
            </Text>
        </Box>
    );
};

export default CookieCounter;

// CookieCounter.js
import React from "react";
import { animated } from "react-spring";
import formatNumber from "../utility/formatNumber";

const CookieCounter = ({ props }) => {
    return (
        <animated.div
            style={{
                marginTop: 20,
                fontSize: 72,
                fontFamily: "Silkscreen, Arial, sans-serif",
                px: 4,
            }}
        >
            {props.number.to((n) => formatNumber(n))}
        </animated.div>
    );
};

export default CookieCounter;

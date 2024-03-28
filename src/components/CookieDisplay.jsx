// CookieDisplay.js
import React from "react";
import { Image } from "rebass";
import cookieImage from "../static/cookie.png";
import withFlair from "./withFlair"; // Import the HOC

const CookieDisplay = ({ setTriggerFlairExternally, flair, onClick }) => {
    return (
        <Image
            src={cookieImage}
            alt="Cookie"
            sx={{
                m: 2,
                cursor: "pointer",
                animation: flair ? "flair 0.3s linear" : "none", // Controlled by flair prop
                width: 300,
                height: 300,
            }}
            onClick={onClick} // External trigger
        />
    );
};

export default withFlair(CookieDisplay);

import React, { useState, useEffect } from "react";
import { Box, Text } from "rebass";
import CookieDisplay from "./CookieDisplay";
import CookieCounter from "./CookieCounter";
import Shop from "./Shop";
import { useSpring } from "react-spring";

const CookieClicker = () => {
    const [cookies, setCookies] = useState(0);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(2000);
    const [itemQuantities, setItemQuantities] = useState({ 1: 0, 2: 0, 3: 0 });
    const [triggerFlair, setTriggerFlair] = useState(false);
    const props = useSpring({ number: cookies, from: { number: 0 } });

    useEffect(() => {
        const interval = setInterval(() => {
            setCookies((currentCookies) => {
                const newCount = currentCookies + cookiesPerSecond;
                if (newCount > currentCookies) {
                    setTriggerFlair(true); // Trigger flair for CPS
                }
                return newCount;
            });
        }, 1000);
        if (triggerFlair) {
            setTriggerFlair(false); // Reset the trigger
        }
        return () => clearInterval(interval);
    }, [cookiesPerSecond, cookies, triggerFlair]);

    const handlePurchase = (item) => {
        if (cookies >= item.cost) {
            setCookies(cookies - item.cost);
            setCookiesPerSecond((cps) => cps + item.cookiesPerSecond);
            setItemQuantities((prev) => ({
                ...prev,
                [item.id]: (prev[item.id] || 0) + 1,
            }));
        } else {
            alert("Not enough cookies!");
        }
    };

    const handleClick = () => {
        setCookies((currentCookies) => currentCookies + 1);
        setTriggerFlair(true); // Trigger flair for cookie click
    };

    const items = {
        1: {
            id: 1,
            name: "Cursor",
            cost: 10,
            cookiesPerSecond: 1,
            requiredCps: 0,
        },
        2: {
            id: 2,
            name: "Grandma",
            cost: 100,
            cookiesPerSecond: 5,
            requiredCps: 10,
        },
        3: {
            id: 3,
            name: "Farm",
            cost: 500,
            cookiesPerSecond: 10,
            requiredCps: 50,
        },
        4: {
            id: 4,
            name: "Mine",
            cost: 2000,
            cookiesPerSecond: 40,
            requiredCps: 100,
        },
        5: {
            id: 5,
            name: "Factory",
            cost: 10000,
            cookiesPerSecond: 100,
            requiredCps: 500,
        },
        6: {
            id: 6,
            name: "Bank",
            cost: 40000,
            cookiesPerSecond: 400,
            requiredCps: 2000,
        },
        7: {
            id: 7,
            name: "Temple",
            cost: 200000,
            cookiesPerSecond: 2000,
            requiredCps: 10000,
        },
        8: {
            id: 8,
            name: "Wizard Tower",
            cost: 3300000,
            cookiesPerSecond: 7000,
            requiredCps: 50000,
        },
        9: {
            id: 9,
            name: "Shipment",
            cost: 51000000,
            cookiesPerSecond: 29000,
            requiredCps: 200000,
        },
        10: {
            id: 10,
            name: "Alchemy Lab",
            cost: 750000000,
            cookiesPerSecond: 100000,
            requiredCps: 1000000,
        },
        11: {
            id: 11,
            name: "Portal",
            cost: 10000000000,
            cookiesPerSecond: 1666666,
            requiredCps: 5000000,
        },
        12: {
            id: 12,
            name: "Time Machine",
            cost: 140000000000,
            cookiesPerSecond: 9876543,
            requiredCps: 10000000,
        },
    };

    return (
        <Box
            sx={{
                textAlign: "center",
                minWidth: "450px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                border: "8px solid #8B4513", // Darker wood color for the border
                boxShadow: `0px 0px 10px #8B4513, 
              inset 0px 0px 10px #8B4513, // Simulating depth
              0px 0px 15px #8B4513, // Outer glow for a cozy effect
              inset 0px 0px 5px #A52A2A`, // Adding some inner texture
            }}
        >
            <CookieDisplay triggerFlair={triggerFlair} onClick={handleClick} />

            <Text
                sx={{
                    fontSize: 44,
                    fontFamily: "Silkscreen, Arial, sans-serif",
                }}
            >
                Cookies:
            </Text>

            <CookieCounter props={props} cookiesPerSecond={cookiesPerSecond} />

            <Shop
                items={items}
                itemQuantities={itemQuantities}
                cookies={cookies}
                cookiesPerSecond={cookiesPerSecond}
                purchaseItem={handlePurchase}
            />
        </Box>
    );
};

export default CookieClicker;

import React, { useState, useEffect } from "react";
import { Box, Text } from "rebass";
import CookieDisplay from "./CookieDisplay";
import CookieCounter from "./CookieCounter";
import Shop from "./Shop";
import { useSpring } from "react-spring";

const CookieClicker = () => {
    const [cookies, setCookies] = useState(100000);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
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

    const handlePurchaseOrClick = () => {
        setTriggerFlair(true); // Activate the flair effect.
        setTimeout(() => setTriggerFlair(false), 500); // Deactivate after 500ms.
    };
    const items = {
        1: { id: 1, name: "Cursor", cost: 10, cookiesPerSecond: 1 },
        2: { id: 2, name: "Grandma", cost: 100, cookiesPerSecond: 5 },
        3: { id: 3, name: "Farm", cost: 500, cookiesPerSecond: 10 },
        4: { id: 4, name: "Mine", cost: 2000, cookiesPerSecond: 40 },
        5: { id: 5, name: "Factory", cost: 10000, cookiesPerSecond: 100 },
        6: { id: 6, name: "Bank", cost: 40000, cookiesPerSecond: 400 },
        7: { id: 7, name: "Temple", cost: 200000, cookiesPerSecond: 2000 },
        8: {
            id: 8,
            name: "Wizard Tower",
            cost: 3300000,
            cookiesPerSecond: 7000,
        },
        9: { id: 9, name: "Shipment", cost: 51000000, cookiesPerSecond: 29000 },
        10: {
            id: 10,
            name: "Alchemy Lab",
            cost: 750000000,
            cookiesPerSecond: 100000,
        },
        11: {
            id: 11,
            name: "Portal",
            cost: 10000000000,
            cookiesPerSecond: 1666666,
        },
        12: {
            id: 12,
            name: "Time Machine",
            cost: 140000000000,
            cookiesPerSecond: 9876543,
        },
    };

    return (
        <Box
            sx={{
                mt: 4,

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
                position: "relative",
                "&:before": {
                    // Using pseudo-elements for additional texture
                    content: '""',
                    position: "absolute",
                    top: -2, // Slightly larger than the border to overlap
                    left: -2,
                    right: -2,
                    bottom: -2,
                    zIndex: -1,
                    background: `linear-gradient(
                  135deg, 
                  rgba(139,69,19, 0.5) 25%, 
                  rgba(160,82,45, 0.5) 25%, 
                  rgba(160,82,45, 0.5) 50%, 
                  rgba(139,69,19, 0.5) 50%, 
                  rgba(139,69,19, 0.5) 75%, 
                  rgba(160,82,45, 0.5) 75%
                )`,
                    backgroundSize: "20px 20px", // Adjust the size to match your preference
                },
            }}
        >
            <CookieDisplay
                triggerFlair={triggerFlair}
                onClick={handlePurchaseOrClick}
            />

            <Text
                sx={{
                    fontSize: 44,
                    fontFamily: "Silkscreen, Arial, sans-serif",
                }}
            >
                Cookies:
            </Text>
            <CookieCounter props={props} />
            <Shop
                items={items}
                itemQuantities={itemQuantities}
                cookies={cookies}
                purchaseItem={(item) => {
                    if (cookies >= item.cost) {
                        setCookies(cookies - item.cost);
                        setCookiesPerSecond(
                            (cps) => cps + item.cookiesPerSecond
                        );
                        setItemQuantities((prev) => ({
                            ...prev,
                            [item.id]: (prev[item.id] || 0) + 1,
                        }));
                    } else {
                        alert("Not enough cookies!");
                    }
                }}
            />
        </Box>
    );
};

export default CookieClicker;
